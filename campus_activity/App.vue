<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	view{
		box-sizing: border-box;
	}
	
	.safety_area{
		width: 100vw;
		height: env(safe-area-inset-bottom);
	}
</style>
