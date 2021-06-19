<template>
  <v-app id="inspire">
    <v-navigation-drawer 
     v-model="drawer" 
     :clipped="$vuetify.breakpoint.lgAndUp"
     app  
    >
    <v-list dense>
      <template>
        <v-list-item :to="{ name:'Home' }">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            Inicio
          </v-list-item-title>
        </v-list-item>
      </template>
      <template>
        <v-list-item :to="{name:'Lessors'}">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action> 
            <v-list-item-content>
              <v-list-item-title>
                Lessors
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </template>
      <template>
        <v-list-item :to="{name:'Tenant'}">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action> 
            <v-list-item-content>
              <v-list-item-title>
                Tenant
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </template>
      <template>
        <v-list-item :to="{name:'Property'}">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action> 
            <v-list-item-content>
              <v-list-item-title>
                Property
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </template>
      <template>
        <v-list-item :to="{name:'CommentProperty'}">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action> 
            <v-list-item-content>
              <v-list-item-title>
                CommentProperty
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </template>
      <template>
        <v-list-item :to="{name:'CommentTenant'}">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action> 
            <v-list-item-content>
              <v-list-item-title>
                CommentTenant
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </template>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      :clipped-left="$vuetify.breakpoint.lgAndUp" 
      app
      color="blue darken-3" 
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <span class="hidden-sm-and-down">HeartHomeUI</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>view_list</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container 
        class="fill-height" 
        fluid
      >
        <v-slide-x-transition mode="out-in">
          <router-view />
        </v-slide-x-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    drawer:null
  }),
};
</script>
