<template>
	<section class="section-list">
		<div class="container-xl">
			<div class="table-schedule">
				<div class="timeline">
					<ul>
						<li><span>09:00</span></li>
						<li><span>09:30</span></li>
						<li><span>10:00</span></li>
						<li><span>10:30</span></li>
						<li><span>11:00</span></li>
						<li><span>11:30</span></li>
						<li><span>12:00</span></li>
						<li><span>12:30</span></li>
						<li><span>13:00</span></li>
						<li><span>13:30</span></li>
						<li><span>14:00</span></li>
						<li><span>14:30</span></li>
						<li><span>15:00</span></li>
						<li><span>15:30</span></li>
						<li><span>16:00</span></li>
						<li><span>16:30</span></li>
						<li><span>17:00</span></li>
						<li><span>17:30</span></li>
						<li><span>18:00</span></li>
					</ul>
				</div>

				<div class="table-schedule-subject">
					<ul class="schedule-day">
						<template v-for="(day, idx) in days">
							<li :key="day">
								<div class="top-info" :class="{ today: today == idx }">
									<h4 class="day">{{ day }}</h4>
								</div>
							</li>
						</template>
					</ul>

					<ul class="list-lecture-item">
						<template>
							<!-- 시간표 요일 -->
							<li
								v-for="(day, idx) in days"
								:key="idx"
								class="timeline-vertical"
							>
								<ul class="schedule_box">
									<!-- 등록된 강의 목록 -->
									<template v-if="scheduleList">
										<li v-for="(list, idx) in scheduleList[day]" :key="idx">
											<div
												class="lecture-time"
												:class="[list.options.range_time, list.options.start]"
												:data-event="`lecture-${list.options.code}`"
												@click="editLecture(list, day)"
											>
												<a href="#">
													<div class="lecture-info">
														<h6 class="lecture-title">
															{{ list.lecture }}
														</h6>
														<h6 class="lecture-location">
															{{ list.location }}
														</h6>
													</div>

													<!-- <template v-if="currentSchedule[day].memo.length > 0">
													<div
														v-for="memo in currentSchedule[day].memo"
														:key="memo"
														class="lecture-noti"
														data-toggle="tooltip"
														data-placement="top"
														title=""
														data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"
													>
														<i class="material-icons ic-lecture-noti"
															>assignment</i
														>
														<span class="lecture-noti-title"
															>과제 제목 텍스트</span
														>
													</div>
												</template> -->
												</a>
											</div>
										</li>
									</template>
								</ul>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: [],
	components: {},
	data() {
		return {
			days: ['mon', 'tue', 'wed', 'thu', 'fri'],
		};
	},
	methods: {
		editLecture: function(list, day) {
			this.$store.commit('EDIT_LECTURE_MEMO_POPUP', [list, day]);
			this.$store.commit('SET_LECTURE_MEMO_STATUS', true);
		},
	},
	computed: {
		today() {
			// 오늘 요일 class 활성화 ( 일요일은 활성화 안됨 )
			return new Date().getDay() - 1;
		},

		scheduleList() {
			let _this = this;

			// 등록된 강의 목록
			this.days.forEach(function(item) {
				_this.$store.getters.scheduleTable[item].forEach(function(list) {
					let options = {};
					let range_time = list.end_time - list.start_time;
					let start = list.start_time;
					let code_no = list.code.split('-');
					options.code = code_no[1];
					if (range_time == 2) {
						options.range_time = 'two-hr';
					}
					options.start = 'hr-' + start;
					list.options = options;
				});
			});

			return this.$store.getters.scheduleTable;
		},
	},
};
</script>

<style lang="scss">
.table-schedule {
	position: relative;
	margin: 2rem 0;

	.timeline {
		display: none;
	}

	.table-schedule-subject {
		.schedule-day {
			display: flex;
			> li {
				width: 20%;
			}
		}

		.timeline-vertical {
			margin-bottom: 2rem;

			ul {
				display: flex;
				position: relative;
				padding: 0 1rem;
				overflow-x: scroll;
				-webkit-overflow-scrolling: touch;
			}
		}

		.top-info {
			padding: 1rem 0;
			text-align: center;
			border-top: 0.0625rem solid #d7e2eb;
			color: #98a8b9;

			h6 {
				margin-bottom: 0;
			}
		}

		.today {
			color: #0078ff;

			.date {
				margin: 0 auto;
				background-color: #0078ff;
				border-radius: 50%;
				width: 2rem;
				color: white;
			}
		}

		.lecture-time {
			flex-shrink: 0;
			float: left;
			margin-right: 0.5rem;
			transition: opacity 0.2s, background 0.2s;
			height: 7rem;
			width: 50%;

			&:before {
				content: '';
				position: absolute;
				width: 0.1875rem;
				height: 100%;
				top: 0;
				left: 0;
			}

			&:last-of-type {
				margin-right: 1rem;
			}

			a {
				display: block;
				height: 100%;
				padding: 1rem;
			}

			.lecture-title {
				display: block;
				margin-bottom: 0;
				font-weight: 700;
			}

			.lecture-location {
				font-size: 14px;
				line-height: 1.5;
				margin-bottom: 0;
				font-weight: 500;
			}

			.lecture-info {
				margin-bottom: 0.5rem;
			}

			.lecture-noti {
				z-index: 500;
			}

			.ic-lecture-noti {
				vertical-align: middle;
				margin-right: 0.125rem;
				font-size: 1rem;
			}

			.lecture-noti-title {
				font-size: 14px;
				line-height: 1.5;
				margin-bottom: 0;
			}
		}
	}

	.lecture-time {
		&[data-event='lecture-01'] {
			background-color: #e0f2f1;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #009688;
			}

			&:hover {
				background-color: #b2dfdb;
			}

			&:before {
				background-color: #009688;
			}
		}

		&[data-event='lecture-02'] {
			background: #efebe9;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #795548;
			}

			&:hover {
				background-color: #d7ccc8;
			}

			&:before {
				background-color: #795548;
			}
		}

		&[data-event='lecture-03'] {
			background: #e1f5fe;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #03a9f4;
			}

			&:hover {
				background-color: #b3e5fc;
			}

			&:before {
				background-color: #03a9f4;
			}
		}

		&[data-event='lecture-04'] {
			background: #ede7f6;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #673ab7;
			}

			&:hover {
				background-color: #d1c4e9;
			}

			&:before {
				background-color: #673ab7;
			}
		}

		&[data-event='lecture-05'] {
			background: #fce4ec;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #e91e63;
			}

			&:hover {
				background-color: #f8bbd0;
			}

			&:before {
				background-color: #e91e63;
			}
		}

		&[data-event='lecture-06'] {
			background: #e8f5e9;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #4caf50;
			}

			&:hover {
				background-color: #c8e6c9;
			}

			&:before {
				background-color: #4caf50;
			}
		}

		&[data-event='lecture-07'] {
			background: #fff3e0;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #ff9800;
			}

			&:hover {
				background-color: #ffe0b2;
			}

			&:before {
				background-color: #ff9800;
			}
		}

		&[data-event='lecture-08'] {
			background: #eeebff;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #0078ff;
			}

			&:hover {
				background-color: #bbcafb;
			}

			&:before {
				background-color: #0078ff;
			}
		}

		&[data-event='lecture-09'] {
			background: #e9ecf3;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #5f7f90;
			}

			&:hover {
				background-color: #cdd7e0;
			}

			&:before {
				background-color: #5f7f90;
			}
		}

		&[data-event='lecture-10'] {
			background: #fbe9e7;

			.lecture-title,
			.lecture-location,
			.ic-lecture-noti,
			.lecture-noti-title {
				color: #ff5722;
			}

			&:hover {
				background-color: #ffccbc;
			}

			&:before {
				background-color: #ff5722;
			}
		}
	}
}

@media (min-width: 992px) {
	.table-schedule {
		width: 90%;
		max-width: 87.5rem;
		margin: 2rem auto;

		&:after {
			clear: both;
			content: '';
			display: block;
		}

		.timeline {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			padding-top: 2.9rem;

			ul {
				padding-top: 0.75rem;

				li {
					position: relative;
					height: 3.5rem;

					&:after {
						content: '';
						position: absolute;
						top: 0;
						left: 3rem;
						width: 96.5%;
						height: 1px;
						background: #d7e2eb;
					}

					&:last-child:after {
						border: none;
					}
				}
			}
		}
	}
}

@media (min-width: 992px) {
	.table-schedule .timeline li {
		span {
			font-size: 12px;
			line-height: 1.5;
			display: inline-block;
			transform: translateY(-50%);
			color: #98a8b9;
		}

		&:after {
			left: 3.75rem;
		}

		&:nth-of-type(2n) span {
			display: none;
		}
	}
}

@media (max-width: 1199px) {
	.table-schedule .table-schedule-subject .timeline-vertical ul {
		padding: 0;
	}
}

@media (max-width: 767px) {
	.table-schedule .table-schedule-subject .lecture-time .lecture-location {
		font-size: 13px;
	}
}

@media (max-width: 767px) {
	.table-schedule .table-schedule-subject .lecture-time .lecture-noti-title {
		font-size: 13px;
	}
}

@media (max-width: 991px) {
	.table-schedule .table-schedule-subject .lecture-time {
		height: auto;

		&:before {
			content: none;
		}
	}
}

@media (min-width: 992px) {
	.table-schedule .table-schedule-subject {
		float: left;
		width: 100%;

		.timeline-vertical {
			float: left;
			margin-bottom: 0;
			width: 20%;
			border-top: 0;

			&:last-child {
				border-right-width: 0;
			}

			&:not(:first-of-type) {
				border-left-width: 0;
			}
		}
	}
}

@media (min-width: 992px) {
	.table-schedule .table-schedule-subject {
		width: calc(100% - 3rem);
		margin-left: 3rem;

		.timeline-vertical {
			ul {
				height: 66.25rem;
				display: block;
				overflow: visible;
				padding: 0;
				border-right: 0.0625rem solid #d7e2eb;
				border-bottom: 0.0625rem solid #d7e2eb;

				&:after {
					display: none;
				}
			}

			&:first-child ul {
				border-left: 0;
			}

			&:last-child ul {
				border-right: 0;
			}
		}

		.lecture-time {
			position: absolute;
			z-index: 3;
			width: calc(100% + 1px);
			left: -0.0625rem;
			flex-shrink: 1;
			max-width: none;
			margin-right: 0;

			a {
				padding: 0.5rem 0.75rem;
				overflow: auto;

				.lecture-noti {
					display: flex;
					align-items: center;
				}
			}

			&:last-of-type {
				margin-right: 0;
			}

			.selected-event {
				visibility: hidden;
			}
		}

		.two-hr {
			height: 14rem;
		}

		.hr-9 {
			top: 0;
		}

		.hr-10 {
			top: 7rem;
		}

		.hr-11 {
			top: 14rem;
		}

		.hr-12 {
			top: 21rem;
		}

		.hr-13 {
			top: 28rem;
		}

		.hr-14 {
			top: 35rem;
		}

		.hr-15 {
			top: 42rem;
		}

		.hr-16 {
			top: 49rem;
		}

		.hr-17 {
			top: 56rem;
		}

		.hr-18 {
			top: 57.375rem;
		}
	}
}

.popover-body {
	.schedule-title {
		margin: 1rem 0 1.5rem;
	}

	.form-group {
		position: relative;
		margin-bottom: 0.5rem;

		.col-form-label {
			width: 100%;
		}

		label {
			font-size: 12px;
			line-height: 1.5;
			display: inline-block;
			margin-bottom: 0.125rem;
			padding-bottom: 0;
		}

		.form-control {
			padding: 0.5rem;
			height: 2.5rem;
			border: 0.0625rem solid #d7e2eb;
			cursor: pointer;
			background-size: 0.625rem 0.3125rem;
			background-color: #fbfbfd;
		}

		input:hover {
			cursor: auto;
		}

		textarea {
			&:hover {
				cursor: auto;
			}

			min-height: 7.5rem;
		}
	}

	.btn-save {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
}
</style>
