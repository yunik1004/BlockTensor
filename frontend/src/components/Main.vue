<template>
    <div>
        <p>This is main!!!</p>
        <p>
            <router-link :to="{name: 'Scratch'}">Hyperlink to scratch</router-link>
        </p>
        <div class="row">
            <div class="col-md-4">.col-md-4</div>
            <div class="col-md-4">.col-md-4</div>
            <div class="col-md-4">.col-md-4</div>
        </div>
        <button type="button" class="btn btn-sm btn-default">Default</button>
        <button type="button" class="btn btn-sm btn-primary">Primary</button>
    </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>
