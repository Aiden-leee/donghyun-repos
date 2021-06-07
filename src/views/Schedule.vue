<template>
	<div class="schedule">
		<div class="container-lecture">
			<section class="header">
				<h3 class="headline">시간표 만들기</h3>
			</section>
			<!-- 강의 목록 -->
			<Lecture />
			<!-- 강의 스케쥴 -->
			<ScheduleList />
		</div>
		<!-- 강의목록 선택 모달 -->
		<LectureModal />
		<!-- 선택된 강의 선택 모달 -->
		<LectureModalMemo />
	</div>
</template>

<script>
import Lecture from '@/components/Lecture.vue';
import ScheduleList from '@/components/ScheduleList.vue';
import LectureModal from '@/components/LectureModal.vue';
import LectureModalMemo from '@/components/LectureModalMemo.vue';

export default {
	components: {
		Lecture,
		ScheduleList,
		LectureModalMemo,
		LectureModal,
	},
};
</script>

<style lang="scss">
.schedule {
	background: #fff;
}
.container-lecture {
	font-size: 0;
	position: relative;

	.header {
		border-bottom: 0.0625rem solid #d7e2eb;
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;

		.headline {
			display: inline-block;
			margin-bottom: 0;
			font-weight: 700;
			color: #263747;
		}
	}

	.section-nav,
	.section-list {
		font-size: 16px;
		line-height: 1.6;
		letter-spacing: -0.009em;
		display: inline-block;
		vertical-align: top;
		padding: 1.5rem;
	}
}

@media (max-width: 767px) {
	.container-lecture {
		.section-nav,
		.section-list {
			font-size: 15px;
		}
	}
}

@media (max-width: 767px) {
	.container-lecture {
		.section-nav,
		.section-list {
			padding: 1.5rem 1rem;
		}
	}
}

@media (max-width: 767px) {
	.container-lecture .section-nav .form-control {
		font-size: 15px;
	}
}

@media (max-width: 1199px) {
	.container-lecture .section-nav .ic-search {
		position: inherit;
		left: 1rem;
		margin-left: 0.5rem;
		transform: translateY(-135%);
	}
}

@media (max-width: 767px) {
	.container-lecture .section-nav .list-lecture .card-lecture .lecture-title {
		font-size: 18px;
	}
}

@media (max-width: 767px) {
	.container-lecture .section-nav .list-lecture .lecture-time {
		font-size: 15px;
	}
}

@media (max-width: 767px) {
	.container-lecture .section-nav .list-lecture .list-lecture-info {
		font-size: 13px;
	}
}

@media (max-width: 1199px) {
	.container-lecture .section-nav .list-lecture {
		display: flex;
		overflow-x: scroll;
		margin-bottom: 0;

		.card-lecture {
			margin-top: 0;
			margin-right: 0.5rem;
			min-width: 15rem;
			width: 100%;
		}
	}
}

@media (max-width: 1199px) {
	.container-lecture .section-nav {
		display: block;
		width: 100%;
		border-bottom: 0.0625rem solid #d7e2eb;
		max-height: 17.5rem;
	}
}

@media (min-width: 1200px) {
	.container-lecture .section-nav {
		position: sticky;
		top: 0;
	}
}

@media (min-width: 768px) {
	.container-lecture .section-list {
		min-height: calc(100vh - 3.125rem - rem-calc(66) - 21.125rem);
	}
}

@media (max-width: 1199px) {
	.container-lecture .section-list {
		display: block;
		padding-top: 0;
		width: 100%;
	}
}

.header-timetable-info {
	display: flex;
	justify-content: space-between;
	align-content: center;
	width: 90%;
	max-width: 1400px;
	margin: 2rem auto;

	h3 {
		margin-bottom: 0;
		margin-left: 3rem;
		font-weight: 700;
	}

	.btn-group {
		.btn-light {
			margin: 0 0.0625rem;
			color: #263747;
			background-color: #e9ecf3;
			border-color: #e9ecf3;
			font-weight: 500;
			border-radius: 0.375rem;

			&:hover {
				color: #263747;
				background-color: #d7e2eb;
				border-color: #d7e2eb;
			}

			&:not(:last-child):not(.dropdown-toggle) {
				border-top-right-radius: 0.375rem;
				border-bottom-right-radius: 0.375rem;
			}
		}

		.btn-previous,
		.btn-next {
			padding: 0 0.25rem;
		}

		.btn-today {
			padding: 0 1.25rem;
		}

		.ic-previous,
		.ic-next {
			vertical-align: bottom;
		}
	}
}

@media (max-width: 991px) {
	.header-timetable-info {
		width: 90%;

		h3 {
			margin-left: 0;
		}
	}
}
</style>
