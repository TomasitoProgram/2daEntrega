import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, lastValueFrom, retry  } from 'rxjs';
import { Publicacion } from '../model/publicacion';
import { showToast } from '../tools/message-routines';
import { showAlertError } from '../tools/message-functions';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    })
  };

  listaPublicaciones: BehaviorSubject<Publicacion[]> = new BehaviorSubject<Publicacion[]>([]);
  apiUrl = 'http://localhost:3000'; // Url al usar en navegador Web
  // apiUrl = 'http://192.168.100.34:3000'; // Url al usar en mi celular en mi WIFI, tu puedes tener otra IP
  
  constructor(private http: HttpClient) { }

  async cargarPublicaciones() {
    this.leerPublicaciones().subscribe({
      next: (publicaciones) => {
        this.listaPublicaciones.next(publicaciones as Publicacion[]);
      },
      error: (error: any) => {
        showToast('El servicio API Rest de Publicaciones no está disponible');
        this.listaPublicaciones.next([]);
      }
    });
  }

  crearPublicacion(publicacion: any): Observable<any> {
    return this.http.post(this.apiUrl + '/publicaciones/', publicacion, this.httpOptions);
  }

  leerPublicaciones(): Observable<any> {
    return this.http.get(this.apiUrl + '/publicaciones/');
  }

  leerPublicacion(idPublicacion: number): Observable<any> {
    return this.http.get(this.apiUrl + '/publicaciones/' + idPublicacion);
  }

  actualizarPublicacion(publicacion: any): Observable<any> {
    return this.http.put(this.apiUrl + '/publicaciones/' + publicacion.id, publicacion, this.httpOptions);
  }

  eliminarPublicacion(publicacionId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/publicaciones/' + publicacionId, this.httpOptions);
  }

  /*codigo chiquillos*/
  async refreshPostList(): Promise<void> {
    try {
      const posts = await this.fetchPosts();
      console.log(posts);
      this.listaPublicaciones.next(posts);
    } catch (error) {
      showAlertError('APIClientService.refreshPostList', error);
    }
  }
  
  // Obtener todas las publicaciones desde la API
  async fetchPosts(): Promise<Publicacion[]> {
    try {
      const posts = await lastValueFrom(
        this.http.get<Publicacion[]>(this.apiUrl + '/posts').pipe(retry(3)));
      return posts.reverse();
    } catch (error) {
      this.handleHttpError('APIClientService.fetchPosts', error);
      return [];
    }
  }

  private handleHttpError(methodName: string, error: any): void {
    if (error instanceof HttpErrorResponse) {
      const statusCode = error.status;
      if (statusCode === 400) {
        showAlertError(`${methodName} - Solicitud incorrecta (400)`, error.message);
      } else if (statusCode === 401) {
        showAlertError(`${methodName} - No autorizado (401)`, error.message);
      } else if (statusCode === 404) {
        showAlertError(`${methodName} - No encontrado (404)`, error.message, true);
      } else if (statusCode === 500) {
        showAlertError(`${methodName} - Error interno del servidor (500)`, error.message);
      } else {
        showAlertError(`${methodName} - Error inesperado (${statusCode})`, error.message);
      }
    } else {
      showAlertError(`${methodName} - Error desconocido`, error);
    }
  }

}
