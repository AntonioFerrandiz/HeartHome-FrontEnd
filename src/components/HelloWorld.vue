<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-">
        <h1 class="display-2 font-weight-bold mb-3">Bienvenidos a Hearthome</h1>

        <p class="subheading font-weight-regular">
          La manera más sencilla de encontrar tu nuevo hogar.<br />
          Explora y descubre un lugar que se adecúe a tus nececidades.
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-card class="mx-auto" max-width="500">
          <v-card-title class="justify-center"
            >Propiedades que te pueden interesar</v-card-title
          >

          <v-container fluid>
            <v-row dense>
              <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                <v-card>
                  <router-link to="/properties/Casa" style="text-decoration: none; color: inherit;">
                    <v-img
                      :src="card.src"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="350px"
                    >
                      <v-card-title v-text="card.title"></v-card-title>
                    </v-img>
                  </router-link>
                  <!--<router-link to="/">
    <v-img src="require('@/assets/my-image.png')"></v-img>
</router-link>-->
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-rating
                      v-model="rating"
                      background-color="orange lighten-3"
                      color="orange"
                      density="compact"
                      half-increments
                      hover
                      size="18"
                    ></v-rating>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Departamentos",
        src: "http://www.construnoticias.com/peru/wp-content/uploads/2019/09/departamentos-lima.jpg",
        flex: 12,
      },
      {
        title: "Casa Punta Sal",
        src: "https://casatatipuntasal.com/wp-content/uploads/2020/06/collage1-1.jpg",
        flex: 6,
      },
      {
        title: "Casa de Campo",
        src: "https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1461736282/p/photo/image/1478928/mv_chontay_02.jpg",
        flex: 6,
      },
    ],
    rating: 0,
  }),
};
</script>
