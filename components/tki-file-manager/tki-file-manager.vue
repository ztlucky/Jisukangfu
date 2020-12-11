<template xlang="wxml" minapp="mpvue">
	<view>
	</view>
</template>
<script>
export default {
	name: 'tki-file-manager',
	props: {},
	data() {
		return {
		}
	},
	methods: {
		
	},
	onLoad() {
		// 			plus.io.resolveLocalFileSystemURL( '/storage/emulated/0', function(fs) {
		// 				var directoryReader = fs.createReader();
		// 				directoryReader.readEntries(function(entries) {
		// 					var i;
		// 					for (i = 0; i < entries.length; i++) {
		// 						console.log(entries[i].name);
		// 					}
		// 				}, function(e) {
		// 					console.log("Read entries failed: " + e.message);
		// 				});
		// 			}, function(e) {
		// 				console.log("Request file system failed: " + e.message);
		// 			});
	}
}
</script>