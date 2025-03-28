<template>
  <div>
    <TwoColumnSection :left-ratio="7" :right-ratio="5">
      <template v-slot:left>
        <img src="/dog.jpg" />
      </template>
      <template v-slot:right>
        <div class="grid grid-cols-1 auto-rows-min content-center gap-5">
          <h1 class="textmarker">
            Gemeinsam für eine bessere Zukunft der Tiere
          </h1>
          <p>
            Unsere Tierrettungsstation setzt sich leidenschaftlich für das Wohl
            von Tieren in Not ein. Wir bieten Schutz, Pflege und ein liebevolles
            Zuhause für alle, die es brauchen.
          </p>
          <div class="flex gap-5">
            <button class="bg-primary" @click="navigateTo('/adopt')">
              Adoptieren
            </button>
            <button class="btn-outline">Jetzt Spenden</button>
          </div>
        </div>
      </template>
    </TwoColumnSection>
    <ThreeColumnSection id="team">
      <template v-slot:title>Team</template>
      <template v-slot:description
        >Lernen Sie die Menschen hinter der Tierrettung kennen.</template
      >
      <template v-slot:left>
        <TeamUser />
      </template>
      <template v-slot:center>
        <TeamUser />
      </template>
      <template v-slot:right>
        <TeamUser />
      </template>
    </ThreeColumnSection>
    <ThreeColumnSection id="kontakt">
      <template v-slot:title>Kontaktieren Sie uns</template>
      <template v-slot:description
        >Wir freuen uns auf Ihre Nachricht und Anfragen!</template
      >
      <template v-slot:left>
        <ContactOptions
          icon="bi-envelope"
          title="E-Mail"
          description="Erreichen Sie uns jederzeit unter unserer E-Mail-Adresse."
          link="hilfe@tierrettung.de"
        />
      </template>
      <template v-slot:center>
        <ContactOptions
          icon="bi-telephone-fill"
          title="Telefon"
          description="Rufen Sie uns an, wir sind für Sie da!"
          link="+49 (0) 123 456789"
        />
      </template>
      <template v-slot:right>
        <ContactOptions
          icon="bi-geo-alt"
          title="Büro"
          description="Besuchen Sie uns in unserem Büro für weitere Informationen."
          link="Musterstraße 123, Berlin, DE 10115"
        />
      </template>
    </ThreeColumnSection>
  </div>
</template>

<script setup>
import TwoColumnSection from './components/sections/TwoColumnSection.vue';
import ThreeColumnSection from './components/sections/ThreeColumnSection.vue';
</script>
