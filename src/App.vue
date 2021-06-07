<template>
	<div id="app">
		<Schedule />
	</div>
</template>

<script>
import Schedule from '@/views/Schedule.vue';
export default {
	components: {
		Schedule,
	},
};
</script>
<style lang="scss">
html {
	width: 100%;
}
body {
	position: relative;
	font-family: NotoSansKR, '맑은 고딕', 'Malgun Gothic', 'Apple Gothic',
		Helvetica, Arial, sans-serif;
	font-size: 16px;
	color: $defaultColor;
	background: #f4f7fa;
	width: 100%;
	min-height: 100vh;
}
a:hover {
	text-decoration: none;
}
</style>
