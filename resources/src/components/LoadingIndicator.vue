<template>
    <div v-show="showLoading" class="page-loading-wrapper">
        <div class="spinner">
            <div ref="animator" class="animation-body" ></div>
            <p v-if="loadingText" class="text">{{ loadingText }}</p>
        </div>
    </div>
</template>

<script>
import Lottie from '~/utils/lottie_light'
import AnimationData from '~/utils/loadingEffect.json'
import utils from '~/utils/misc'
export default {
    name: 'LoadingIndicator',
    props: {
        showing: {
            type: Boolean,
            default: false
        },

        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showLoading: false
        }
    },
    computed: {
        loadingText() {
            return utils.trim(this.text)
        }
    },

    watch: {
        showing(val) {
            val ? this.showAnimation() : this.hideAnimation()
        }
    },

    mounted() {
        const container = this.$el.querySelector('.animation-body')
        this.animator = Lottie.loadAnimation({
            container,
            loop: true,
            autoplay: false,
            animationData: AnimationData
        })
    },

    methods: {
        showAnimation() {
            this.animator.isPaused && this.animator.play()
            this.showLoading = true
            this.start = performance.now()
        },

        hideAnimation() {
            if (this.animator.isPaused) {
                return
            }
            this.end = performance.now()
            let time = this.end - this.start
            if (time / 1000 > 1.7) {
                this.showLoading = false
                this.animator.stop()
            } else {
                setTimeout(() => {
                    this.showLoading = false
                    this.animator.stop()
                }, 1700 - time)
            }
            // this.animator.stop()
        }
    }
}
</script>

<style lang='scss'>
    .page-loading-wrapper {
        bottom: 0;
        color: #999;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 9000;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .spinner {
        position: absolute;
        text-align: center;
        /*top: 95px;*/
        top: 36%;
        left: 0;
        width: 100%;
    }

    .spinner {
        .animation-body {
            width: 60px;
            height: 60px;
            display: inline-block;
        }

        .text {
            color: #fff;
            margin-top: 10px;
        }
    }

</style>
