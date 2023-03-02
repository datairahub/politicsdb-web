<template>
  <div class="navbar">
    <div class="navbar__logo">
      <router-link :to="{ name: 'home' }">
        <LogoBase />
      </router-link>
    </div>
    <nav class="navbar__links">
      <ul>
        <li>
          <router-link :to="{ name: 'explore' }">
            Datos
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'faqs' }">
            FAQs
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'contact' }">
            Contacto
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import LogoBase from '@/components/layout/logo/LogoBase.vue';
</script>

<style lang="scss">
.navbar {
  padding: 16px 20px;
  display: flex;
  gap: 20px;
  // background: var(--background-color-darker);
  &__logo {
    flex: 0 0 20px;
    line-height: 0;
    a {
      line-height: 0;
      display: block;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
  &__links {
    flex: 1 0 auto;
    line-height: 20px;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 20px;
      justify-content: flex-end;
    }
    a {
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-color-default);
      font-size: 14px;
      display: block;
      &:focus,
      &:hover {
        color: var(--text-color-lighter);
      }
    }
  }
}

@media screen and (min-width: 920px) {
  .navbar {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
