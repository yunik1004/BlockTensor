<template>
    <div>
        <p>This is main!!!</p>
        <p>
            <router-link :to="{name: 'Scratch'}">Hyperlink to scratch</router-link>
        </p>
         <p>
            <router-link :to="{name: 'Scroll'}">Scroll</router-link>
         </p>
    </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>
