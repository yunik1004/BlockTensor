<template>
    <div>
        <p>This is main!!!</p>
        <p>
            <router-link :to="{name: 'Scratch'}">Hyperlink to scratch</router-link>
        </p>
    </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>
