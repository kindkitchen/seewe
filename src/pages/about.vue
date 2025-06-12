<template>
  <section class="py-16 bg-white">
    <div class="mx-auto text-center">
      <t-h :n="5" class="text-3xl md:text-4xl font-bold mb-8">
        How It Works?
      </t-h>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6">
          <t-h :n="6" class="text-2xl font-bold mb-4">
            1. Write in Markdown
          </t-h>
          <p>
            Start with a blank canvas or use our templates. Write your CV in
            Markdown syntax.
          </p>
        </div>
        <div class="p-6">
          <t-h :n="6" class="text-2xl font-bold mb-4">
            2. Preview & Customize
          </t-h>
          <p>
            Instantly preview your CV as you type. Customize the layout and
            design to fit your style.
          </p>
        </div>
        <div class="p-6">
          <t-h :n="6" class="text-2xl font-bold mb-4">
            3. Download & Share
          </t-h>
          <p>
            Download your CV as a PDF or share it online with a personalized
            link. Manage multiple CVs effortlessly.
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="mx-auto text-center mt-16">
    <t-h :n="1" class="text-3xl md:text-4xl font-bold mb-8">
      How It Works Even More Better?
    </t-h>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-6">
        <t-h :n="4" class="text-2xl font-bold mb-4"> 1. Login </t-h>
        <p>
          Log in to your account, and your CV will be accessible directly on the
          web through a unique link. Share it with ease!
        </p>
      </div>
      <div class="p-6">
        <t-h :n="4" class="text-2xl font-bold mb-4"> 2. Add a Username </t-h>
        <p>
          Personalize your profile by adding a username in settings. Instead of
          random ID numbers, your unique nickname will appear in the URL.
        </p>
      </div>
      <div class="p-6">
        <t-h :n="4" class="text-2xl font-bold mb-4"> 3. Name Your CV </t-h>
        <p>
          Name your CVs according to different positions, like Full-Stack,
          Frontend, or Backend. Apply to various roles with targeted CVs using
          distinct URLs.
        </p>
      </div>
    </div>
  </div>
</template>
