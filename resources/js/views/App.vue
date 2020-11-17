<template>
    <v-app>
        <v-main class="font background">
            <v-container fluid>
                <router-view class="font"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.font {
    font-family: "Kanit", "Roboto", sans-serif;
}
.background {
    background-color: #abf0ff;
}
</style>
