import { Usuario } from './../../model/usuario';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonFabButton, IonFab, IonList, IonCardContent, IonHeader
  , IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle
  , IonCardSubtitle, IonItem, IonLabel, IonInput, IonTextarea
  , IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent
  , IonFabList } from '@ionic/angular/standalone';
import { pencilOutline, trashOutline, add } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { Post } from 'src/app/model/post';
import { Publicacion } from 'src/app/model/publicacion';

import { showToast } from 'src/app/tools/message-functions';
import { addIcons } from 'ionicons';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  standalone: true,
  imports: [IonList, IonHeader, IonToolbar, IonTitle, IonCard
    , IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem
    , IonLabel, IonInput, IonTextarea, IonGrid, IonRow, IonCol
    , IonButton, IonIcon, IonContent, IonCardContent
    , IonFab, IonFabButton, IonFabList
    , CommonModule, FormsModule]
})
export class ForumComponent implements OnInit, OnDestroy {

  post: Publicacion = new Publicacion();
  posts: Publicacion[] = [];
  selectedPostText = '';
  intervalId: any = null;
  usuario = new Usuario();
  private postsSubscription!: Subscription;
  private userSubscription!: Subscription;

  constructor(private api: APIClientService, private auth: AuthService) {
    addIcons({ pencilOutline, trashOutline, add });
  }

  ngOnInit() {
    this.postsSubscription = this.api.listaPublicaciones.subscribe((posts) => {
      this.posts = posts;
    });
    this.userSubscription = this.auth.usuarioAutenticado.subscribe((user) => {
      this.usuario = user? user : new Usuario();
    });
    this.api.leerPublicaciones(); // Actualiza lista de posts al iniciar
  }

  ngOnDestroy() {
    if (this.postsSubscription) this.postsSubscription.unsubscribe();
  }

  cleanPost() {
    this.post = new Publicacion();
    this.selectedPostText = 'Nueva publicación';
  }

  savePost() {
    if (!this.post.title.trim()) {
      showToast('Por favor, completa el título.');
      return;
    }
    if (!this.post.body.trim()) {
      showToast('Por favor, completa el cuerpo.');
      return;
    }

    if (this.post.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }

  private async createPost() {
    this.post.author = this.usuario.nombre + ' ' + this.usuario.apellido;
    const createdPost = await this.api.crearPublicacion(this.post);
    if (createdPost) {
      showToast(`Publicación creada correctamente: ${createdPost}`);
      this.cleanPost();
    }
  }

  private async updatePost() {
    this.post.author = this.usuario.nombre + ' ' + this.usuario.apellido;
    const updatedPost = await this.api.actualizarPublicacion(this.post);
    if (updatedPost) {
      showToast(`Publicación actualizada correctamente: ${updatedPost}`);
      this.cleanPost();
    }
  }

  editPost(post: Publicacion) {
    this.post = { ...post }; // Crea una copia para editar sin afectar la lista
    this.selectedPostText = `Editando publicación #${post.id}`;
    document.getElementById('topOfPage')!.scrollIntoView({ behavior: 'smooth' });
  }

  async deletePost(post: Publicacion) {
    const success = await this.api.eliminarPublicacion(post.id);
    if (success) {
      showToast(`Publicación eliminada correctamente: ${post.id}`);
      this.cleanPost();
    }
  }

  getPostId(index: number, post: Publicacion) {
    return post.id;
  }
}
