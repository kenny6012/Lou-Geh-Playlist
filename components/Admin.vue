<template>
<div class="pages__layout">
    <div class="pages__header">
        <div class="pages__header1">
            <div class="pages__searchBar">
                <div class="pages__searchIcon">
                    <font-awesome-icon icon="search" />
                </div>
                <input class="pages__searchInput" type="text" placeholder="Search tracks here...">
            </div>
        </div>
        <div class="pages__header2">       
            <button class="pages__logout">
                <font-awesome-icon icon="power-off" />
            </button>
        </div>
    </div>
    <div class="pages__content">
        Admin
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {
        
    },
    mounted() {
        this.$store.commit("activePages", "nav_admin");
    },
    
}
</script>

<style>

</style>