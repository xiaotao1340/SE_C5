<template>
    <v-container class="fill-height">
      <v-layout align-center align-content-center>
          <v-container>
            <v-row class="text-center fill-height">
              <v-sheet
              class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
              elevation="4"
              height="250"
              rounded
              max-width="800"
              width="100%"
              >
                <div>
                    <h2 class="text-h4 font-weight-black text-orange">Welcome to IOT-WEB!</h2>
            
                    <div class="text-h5 font-weight-medium mb-2">
                    You can now try our IoT device management system!
                    </div>

                    <v-btn href="/register" variant="text" color="orange">Go to Signup</v-btn>
                    <v-btn href="/login" variant="text" color="orange">Go to Login</v-btn>
                </div>
              </v-sheet>
            </v-row>
          </v-container>
      </v-layout>
    </v-container>
  </template>