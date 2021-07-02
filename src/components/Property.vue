<template>
  <v-data-table
    :headers="headers"
    :items="properties"
    :search="search"
    sort-by="name"
    class="elevation-1" style="width:800px"><!--Se agregó el style-->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Properties</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" 
        append-icon="search" label="Search Property"  
        single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Property</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="lessorID" label="LessorID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="district" label="District"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="type" label="Type"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="address" label="Address"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="description" label="Description"></v-text-field>
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
        <td>{{ item.propertyID }}</td>
        <td>{{ item.lessorID }}</td>
        <td>{{ item.district }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
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
            { text: 'propertyID', value: 'propertyID', sortable: true },
            { text: 'lessorID', value: 'lessorID', sortable: true },
            { text: 'District', value: 'district', sortable: false },
            { text: 'Type', value: 'type' , sortable: false },
            { text: 'Address', value: 'address', sortable: false },
            { text: 'Name', value: 'name', sortable: false},
            { text: 'Description', value: 'description', sortable: false },        
          ],
          search: '',
          propertyID: '',
          lessorID: '',
          district: '',
          type: '',
          address: '',
          name: '',
          description: '',
          properties: [],
          editedIndex: -1
        }),
        computed: {
          formTitle(){
            return this.editedIndex === -1 ? 'New Property' : 'Edit Property'
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
            getCurrencyDate(){
              let current = new Date();
              let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
              let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
              let dateTime = cDate + ' ' + cTime;
            },
            list(){
                let me = this;
                axios.get('api/Properties/GetProperties')
                .then(function(response){
                  //console.log(response);
                  me.properties = response.data;
                }).catch(function(error){
                  console.log(error);
                });
            },
            editItem(item){
              this.propertyID = item.propertyID;
              this.lessorID = item.lessorID;
              this.district = item.district;
              this.type = item.type;
              this.address = item.address;
              this.name = item.name;
              this.description = item.description;
              this.editedIndex = 1;
              this.dialog = true;
            },
            deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Property?'))
                axios.delete('api/Properties/'+item.propertyID,{
                      'id': item.propertyID
                }).then(function(response){
                  console.log(item.propertyID);
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
                this.propertyID = "";
                this.lessorID = "";
                this.district = "";
                this.type = "";
                this.address = "";
                this.name = "";
                this.description = "";
                this.editedIndex= -1;
            },
            save() {
              let me = this;
              if(this.editedIndex > -1) { //Editar Property
                axios.put('api/Properties/PutProperty',{
                          'propertyID': me.propertyID,
                          'lessorID': me.lessorID,
                          'district': me.district,
                          'type': me.type,
                          'address': me.address,
                          'name': me.name,
                          'description': me.description
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              } else{
                axios.post('api/Properties/PostProperty/'+me.lessorID,{ // Nuevo Property
                           'lessorID': me.lessorID,
                           'district': me.district,
                           'type': me.type,
                           'address': me.address,
                           'name': me.name,
                           'description': me.description
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