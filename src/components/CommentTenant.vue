<template>
  <v-data-table
    :headers="headers"
    :items="commentTenants"
    :search="search"
    sort-by="Comment"
    class="elevation-1" style="width:800px"><!--Se agregó el style-->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD CommentTenant</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" 
        append-icon="search" label="Search CommentTenant"  
        single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New CommentTenant</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="tenantID" label="TenantID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="lessorID" label="LessorID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="rating" label="Rating"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="comment" label="Comment"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{item.commentID}}</td>
        <td>{{ item.tenantID }}</td>
        <td>{{ item.lessorID }}</td>
        <td>{{ item.rating }}</td>
        <td>{{ item.comment }}</td>
        <td class="justify-center layout px-0">
          <v-icon 
            small 
            class="mr-2" 
            @click="editItem(item)"
          >
            edit
          </v-icon>
          <v-icon 
            small 
            class="mr-2" 
            @click="deleteItem(item)"
          >
            delete
          </v-icon>
        </td>
      </tr>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="list">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios'
    export default {
        data: () => ({
          dialog: false,
          headers: [
            { text: 'commentID', value: 'lessorID', sortable: true },
            { text: 'tenantID', value: 'tenantID', sortable: true },
            { text: 'lessorID', value: 'lessorID', sortable: false },
            { text: 'Rating', value: 'rating' , sortable: false },
            { text: 'Comment', value: 'comment', sortable: false },
          ],
          search: '',
          commentID: '',
          tenantID: '',
          lessorID: '',
          rating: '',
          comment: '',
          commentTenants: [],
          editedIndex: -1
        }),
        computed: {
          formTitle(){
            return this.editedIndex === -1 ? 'New CommentTenant' : 'Edit CommentTenant'
          },
        },
        watch: {
          dialog (val){
            val || this.close()
          },
        },
        created () {
            this.list();
        },
        methods: {
            list(){
                let me = this;
                axios.get('api/CommentTenants/GetCommentTenants')
                .then(function(response){
                  console.log(response);
                  me.commentTenants = response.data;
                }).catch(function(error){
                  console.log(error);
                });
            },
            editItem(item){
              this.commentID = item.commentID;
              this.tenantID = item.tenantID;
              this.lessorID = item.lessorID;
              this.rating = item.rating;
              this.comment = item.comment;
              this.editedIndex = 1;
              this.dialog = true;
            },
            deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este CommentTenant?'))
                axios.delete('api/CommentTenants/'+item.commentID,{
                      'id': item.commentID
                }).then(function(response){
                  console.log(item.commentID);
                  me.close();
                  me.list();                    
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            },
            close() {
                this.dialog = false
            },
            clean(){
                this.commentID = "";
                this.tenantID = "";
                this.lessorID = "";
                this.rating = "";
                this.comment = "";
                this.editedIndex= -1;
            },
            save() {
              let me = this;
              if(this.editedIndex > -1) { //Editar Comment Tenant
                axios.put('api/CommentTenants/PutCommentTenant',{
                          'commentID': me.commentID,
                          'tenantID': me.tenantID,
                          'lessorID': me.lessorID,
                          'rating': me.rating,
                          'comment': me.comment,
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              } else{
                axios.post('api/CommentTenants',{ // Nuevo Comment Tenants
                          'tenantID': me.tenantID,
                          'lessorID': me.lessorID,
                          'rating': me.rating,
                          'comment': me.comment,
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            }
            this.close()
          },
        },
    }
</script>