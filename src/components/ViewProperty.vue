<template>
  <v-container>
    <v-row no-gutters>
      <v-col lg="5">
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            Casa de Campo
            <v-btn icon color="pink">
              <v-icon>mdi-heart</v-icon>
            </v-btn></v-card-title
          >
          <v-card-subtitle>
            Bonita casa de campo a solo una hora de Lima
          </v-card-subtitle>
          <v-card-actions
            ><v-rating
              v-model="rating"
              background-color="orange lighten-3"
              color="orange"
              density="compact"
              half-increments
              hover
              size="18"
            ></v-rating>

            <v-btn text> Reseñas </v-btn>
          </v-card-actions>
          <v-carousel hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="pa-2" outlined tile>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1 mt-15 pt-16">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle
                ># Huéspedes # Habitaciones # Cama #Baño S/.
                100.00</v-list-item-subtitle
              >
              <v-card>
                <v-card-text class="text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  eu nulla ac mi euismod hendrerit quis vel erat. Curabitur
                  posuere viverra nisi a sagittis. Nulla accumsan lorem non
                  tempor pulvinar. Ed vitae lectus ac ex porttitor lacinia.
                  Suspendisse at molestie enim, eget.
                </v-card-text>
                <v-card-actions>
                  <v-row>
                    <v-col>
                      <v-row class="justify-center"
                        ><v-icon x-large class="mb-2"> king_bed</v-icon></v-row
                      >
                      <p class="caption text-center">Camas</p>
                    </v-col>
                    <v-col>
                      <v-row class="justify-center"
                        ><v-icon x-large class="mb-2"> people</v-icon></v-row
                      >
                      <p class="caption text-center">Personas</p>
                    </v-col>
                    <v-col>
                      <v-row class="justify-center"
                        ><v-icon x-large class="mb-2"> wifi</v-icon></v-row
                      >
                      <p class="caption text-center">Wifi</p>
                    </v-col>
                    <v-col>
                      <v-row class="justify-center"
                        ><v-icon x-large class="mb-2"> tv</v-icon></v-row
                      >
                      <p class="caption text-center">Tv</p>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              class="ma-2 white--text"
              :loading="loading"
              :disabled="loading"
              color="blue accent-2"
              @click="loader = 'loading'"
            >
              Reservar
            </v-btn>
            
          </v-card-actions>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      datos: [
        {
          title: "Casa de Campo",
        },
        {
          subtitle: "Bonita casa de campo a solo una hora de Lima",
        },
      ],
      items: [
        {
          src: "https://img10.naventcdn.com/avisos/11/00/59/55/97/23/1200x1200/231942366.jpg",
        },
        {
          src: "https://img10.naventcdn.com/avisos/11/00/59/55/97/23/1200x1200/231942356.jpg",
        },
        {
          src: "https://img10.naventcdn.com/avisos/11/00/59/55/97/23/1200x1200/231942380.jpg",
        },
      ],
    };
  },
};
</script>