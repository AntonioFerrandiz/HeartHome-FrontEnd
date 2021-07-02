<template>
  <v-data-table
    :headers="headers"
    :items="lessors"
    :search="search"
    sort-by="firstName"
    class="elevation-1" style="width:800px"><!--Se agregó el style-->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Lessors</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" 
        append-icon="search" label="Search Lessor"  
        single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Lessor</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="firstName" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="lastname" label="Lastname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="dni" label="DNI"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="phone" label="Phone"></v-text-field>
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
        <td>{{ item.lessorID }}</td>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastname }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.dni }}</td>
        <td>{{ item.phone }}</td>
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
            { text: 'lessorID', value: 'lessorID', sortable: true },
            { text: 'Firstname', value: 'firstName', sortable: true },
            { text: 'Lastname', value: 'lastname' , sortable: true },
            { text: 'Email', value: 'email', sortable: false },
            { text: 'DNI', value: 'dni', sortable: false},
            { text: 'Phone', value: 'phone', sortable: false},
          ],
          search: '',
          lessorID: '',
          firstName: '',
          lastname: '',
          email: '',
          dni: '',
          phone: '',
          lessors: [],
          editedIndex: -1
        }),
        computed: {
          formTitle(){
            return this.editedIndex === -1 ? 'New Lessor' : 'Edit Lessor'
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
                axios.get('api/Lessors/GetLessors')
                .then(function(response){
                  //console.log(response);
                  me.lessors = response.data;
                }).catch(function(error){
                  console.log(error);
                });
            },
            editItem(item){
              this.lessorID = item.lessorID;
              this.firstName = item.firstName;
              this.lastname = item.lastname;
              this.email = item.email;
              this.dni = item.dni;
              this.phone = item.phone;
              this.editedIndex = 1;
              this.dialog = true;
            },
            deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Lessor?'))
                axios.delete('api/Lessors/'+item.lessorID,{
                      'id': item.lessorID
                }).then(function(response){
                  console.log(item.lessorID);
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
                this.lessorID = "";
                this.firstName = "";
                this.lastname = "";
                this.email = "";
                this.dni = "";
                this.phone = "";
                this.editedIndex= -1;
            },
            save() {
              let me = this;
              if(this.editedIndex > -1) { //Editar Lessor
                axios.put('api/Lessors/PutLessor',{
                          'lessorID': me.lessorID,
                          'firstName': me.firstName,
                          'lastname': me.lastname,
                          'email': me.email,
                          'dni': me.dni,
                          'phone': me.phone
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              } else{
                axios.post('api/Lessors',{ // Nuevo Lessor
                           'firstName': me.firstName,
                           'lastname': me.lastname,
                           'email': me.email,
                           'dni': me.dni,
                           'phone': me.phone
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