<template>
	<div
		class="lecture-time"
		:class="[list.options.range_time, list.options.start]"
		:data-event="`lecture-${list.options.code}`"
		@click="editLecture(list)"
	>
		<a href="#">
			<div class="lecture-info">
				<h6 class="lecture-title">
					{{ list.lecture }}
				</h6>
				<h6 class="lecture-location">{{ list.location }}</h6>
			</div>
			<div
				class="lecture-noti"
				data-toggle="tooltip"
				data-placement="top"
				title=""
				data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"
			>
				<i class="material-icons ic-lecture-noti">assignment</i>
				<span class="lecture-noti-title">과제 제목 텍스트</span>
			</div>
		</a>
	</div>
</template>

<script>
export default {
	props: ['list'],
	methods: {
		editLecture: function(list) {
			this.$store.commit('EDIT_LECTURE_MEMO_POPUP', list);
			this.$store.commit('SET_LECTURE_MEMO_STATUS', true);
		},
	},
};
</script>

<style></style>
