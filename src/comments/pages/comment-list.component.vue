<template>
  <pv-toolbar style="background: transparent">
    <template #center>
      <pv-button icon="pi pi-plus" label="Add comment" class="mr-2" @click="openNew" />
    </template>
  </pv-toolbar>
  <div class="card-container">
    <div v-for="comment in comments" :key="comment.id" class="card">
      <pv-card style="width: 25em; background:transparent; border-radius:20px; border: 0.5px solid white; color:white;">
        <template #header>
          <div class="frame-container">
            <img :src="comment.imageUrl" alt="Image">
          </div>
        </template>
        <template #title> {{ comment.title }} </template>
        <template #subtitle> {{comment.emoji}} </template>
        <template #content>
          {{comment.content}}
        </template>
        <template #footer>
          <pv-button icon="pi pi-pencil" label="Edit" style="background-color:#3a6cc5" @click="editComment(comment)"/>
          <pv-button icon="pi pi-trash" label="Delete" style="margin-left: 0.5em; background-color: #f3f311; color:#282828 !important;" @click="confirmDeleteComment(comment)" />
        </template>
      </pv-card>
    </div>
  </div>

  <pv-dialog
      v-model:visible="commentDialog"
      :style="{width:'450px'}"
      header="Comment Information"
      :modal="true"
      class="p-fluid"
  >
    <div class="filed mt-3">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="title"
            v-model.trim="comment.title"
            required="true"
            autofocus
            :class="{'p-invalid': submitted && !comment.title}"
        />
        <label for="title">Title</label>
        <small class="p-error" v-if="submitted && !comment.title" >
          Title is required.
        </small>
      </span>
    </div>
    <div class="field">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="emoji"
            v-model="comment.emoji"
            required="false"
        />
        <label for="emoji">Emoji</label>
      </span>
    </div>
    <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="content"
              v-model="comment.content"
              required="false"
              rows="2"
              cols="20"
          />
          <label for="content">Content</label>
        </span>
    </div>
    <div class="field">
      <span class="p-float-label">
        <pv-input-text
            type="text"
            id="imageUrl"
            v-model="comment.imageUrl"
            required="false"
        />
        <label for="imageUrl">Url Image</label>
      </span>
    </div>
    <template #footer>
      <pv-button
          :label="'Cancel'.toUpperCase()"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
      />
      <pv-button
          :label="'Save'.toUpperCase()"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveComment"
      />
    </template>
  </pv-dialog>
  <pv-dialog
      v-model:visible="deleteCommentDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="comment">
            Are you sure you want to delete <b>{{ comment.title }}</b>?
        </span>
    </div>
    <template #footer>
      <pv-button
          :label="'No'.toUpperCase()"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteCommentDialog = false"
      />
      <pv-button
          :label="'Yes'.toUpperCase()"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteComment"
      />
    </template>
  </pv-dialog>
</template>

<script>
import {CommentsApiService} from "@/comments/services/comments-api.service";

export default{
  name: "comments-crisol",
  data(){
    return{
      comments:[],
      commentDialog:false,
      deleteCommentDialog:false,
      comment:{},
      commentsService: null,
      filters:{},
      submitted: false,
    };
  },
  created() {
    this.commentsService = new CommentsApiService();
    this.commentsService.getAll()
        .then(response => {
          this.comments = response.data;
          console.log(this.comments);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  },
  methods:{
    openNew(){
      this.comment = {};
      this.submitted = false;
      this.commentDialog = true;
    },
    hideDialog(){
      this.commentDialog = false;
      this.submitted = false;
    },
    saveComment(){
      this.submitted = true;
      if (this.comment.title.trim()){
        if (this.comment.id){
          console.log(this.comment);
          this.commentsService
              .update(this.comment.id, this.comment)
              .then((response)=> {
                console.log(response.data.id);
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Tutorial Updated",
                  life: 3000,
                });
                console.log(response);
              });
        } else {
          this.comment.id = 0;
          console.log(this.comment);
          this.commentsService.create(this.comment)
              .then((response) => {
                this.comments.push(this.comment);
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Tutorial Created",
                  life: 3000,
                });
                console.log(response)
              });
        }
        this.commentDialog = false;
        this.comment = {};
      }
    },
    editComment(comment){
      console.log(comment);
      this.comment = {...comment};
      console.log(this.comment);
      this.commentDialog = true;
    },
    confirmDeleteComment(comment){
      this.comment = comment;
      this.deleteCommentDialog = true;
    },
    deleteComment() {
      this.commentsService.delete(this.comment.id).then((response) => {
        this.comments = this.comments.filter(
            (t) => t.id !== this.comment.id
        );
        this.deleteCommentDialog = false;
        this.comment = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Comment Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },
  }

};
</script>


<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 10px;
}

.card {
  width: 25em;
  margin-bottom: 20px;
}
img{
  border-radius:20px 20px 0 0;
}

@media screen and (max-width: 768px) {
  .card {
    width: calc(100% - 40px);
  }
}
</style>