<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="footer__hint">
        <a href="https://www.dataira.com/" target="_blank" rel="noopener noreferrer">
          <img src="/img/dataira/dataira-logo-white.svg" alt="DATAIRA">
        </a>
      </div>
      <nav class="footer__links">
        <ul>
          <li>
            <router-link :to="{ name: 'about' }">
              Acerca de
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'license' }">
              Licencia
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'contrib' }">
              Colabora
            </router-link>
          </li>
          <li>
            <a href="https://github.com/datairahub/politicsdb-api" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p class="footer__disclaimer">
      Esta página no utiliza cookies publicitarias o de terceros
    </p>
  </footer>
</template>

<style lang="scss">
.footer {
  padding: 16px 20px;
  background: var(--background-color-inverted);
  color: var(--text-color-inverted);
  text-align: center;
  font-size: 12px;
  a {
    color: var(--text-color-inverted);
    text-decoration: none;
    font-weight: 600;
  }
  &__hint {
    margin-bottom: 10px;
    img {
      height: 12px;
      margin: 0 auto 12px;
    }
  }
  &__links {
    margin-bottom: 10px;
    ul {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
  &__disclaimer {
    font-size: 10px;
  }
}
</style>
