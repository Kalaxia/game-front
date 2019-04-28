<template>
    <div class="shape" :data-type="type" :style="{ width: `${width}px` , height: `${height}px` }"></div>
</template>

<script>
export default {
    name: 'planet-shape',

    props: ['id', 'type', 'width', 'height']
}
</script>

<style lang="less" scoped>
.shape {
    display: inline-block;
    margin: 0;
    border-radius: 50%;
    position: relative;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 50px rgba(200, 200, 255, 0.8);
    
    &:before {
        content: "";
        position: absolute;
        top: 1%;
        left: 5%;
        width: 90%;
        height: 90%;
        border-radius: 50%;
        background: radial-gradient(circle at 50% 0px, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 58%);
        -webkit-filter: blur(5px);
        z-index: 200;
    }

    &:after {
        content: "";
        position: absolute;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: radial-gradient(circle at 50% 30%, rgba(245, 237, 48, 0), rgba(200, 190, 20, 0) 50%, #222 100%);
    }

    & .shadow {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.2) 50%);
        -webkit-transform: rotateX(90deg) translateZ(-160px);
        transform: rotateX(90deg) translateZ(-160px);
        z-index: 100;
    }

    &[data-type="arctic"] {
        background-image: url('/images/planet_type_arctic.png');
    }
    &[data-type="desert"] {
        background-image: url('https://thumbs-prod.si-cdn.com/2bwj3CJjdzY5JWf8qQPqmQZTyT0=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/4e/86/4e86b49b-bfc0-442a-8bf2-47f386b53313/screen_shot_2014-01-08_at_125812_pm.png');
    }
    &[data-type="oceanic"] {
        background-image: url('/images/planet_type_oceanic.png') ;
    }
    &[data-type="temperate"] {
        background-image: url('http://mississippiriverdelta.org/files/2016/07/Copy-of-IMG_6504-720x480.jpg');
    }
    &[data-type="tropical"] {
        background-image: url('https://upload.wikimedia.org/wikipedia/commons/3/3b/Satellite_image_of_Bangladesh_in_October_2001.jpg');
    }
    &[data-type="rocky"] {
        background-image: url('https://www.textures.com/system/gallery/photos/Rock/Sediment/50887/RockSediment0012_1_download600.jpg');
    }
    &[data-type="volcanic"] {
        background-image: url('http://spiralgraphics.biz/packs/terrain_volcanic_gaseous/previews/Lava%20Cracks.jpg');
        box-shadow: 0px 0px 50px rgba(200, 0, 0, 0.8);

        &:before {
            background: radial-gradient(circle at 50% 0px, rgba(50, 50, 50, 0.6), rgba(255, 255, 255, 0) 58%);
        }
    }
}
</style>
