<template>
	<transition name="fade">
		<div class="modal-popup" v-if="isShow || isOverlap" id="modal-lecture-info">
			<div class="wrap" v-if="isOverlap">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button
								type="button"
								class="close"
								data-dismiss="modal"
								aria-label="Close"
								@click="close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div class="modal-body">
							<h3
								class="lecture-title"
								style="font-size:20px; line-height: 30px; text-align: center;"
							>
								중복되는 강의가 있어서 등록할 수 없습니다.<br />다른 강의를
								선택해주세요.
							</h3>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="wrap" :class="{ show: isShow }">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button
								type="button"
								class="close"
								data-dismiss="modal"
								aria-label="Close"
								@click="close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div class="modal-body">
							<h3 class="lecture-title">{{ currentLecture.lecture }}</h3>
							<ul class="lecture-info">
								<li class="lecture-time">
									<i class="material-icons ic-lecture-info">access_alarm</i>
									<span
										>강의 시간 :
										{{ currentLecture.start_time | timeFilterFormat }} -
										{{ currentLecture.end_time | timeFilterFormat }} |
										{{ currentLecture.dayofweek | dayFilterFormat }}</span
									>
								</li>
								<li class="lecture-code">
									<i class="material-icons ic-lecture-info">code</i>
									<span>교과목 코드 : {{ currentLecture.code }}</span>
								</li>
								<li class="lecture-code">
									<i class="material-icons ic-lecture-info">school</i>
									<span>담당 교수 : {{ currentLecture.professor }}</span>
								</li>
								<li class="lecture-code">
									<i class="material-icons ic-lecture-info">business</i>
									<span>강의실 : {{ currentLecture.location }}</span>
								</li>
							</ul>
							<div class="lecture-description">
								<p class="txt-description">
									본 강의에서는 JSP를 이용한 웹 기반 프로그래밍 기초 및
									응용기술에 대해 학습합니다. 특히 실습 위주의 수업으로
									프로그래밍 스킬 향상 및 실무 능력을 갖출 수 있도록 합니다.
								</p>
							</div>
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-light"
								data-dismiss="modal"
								@click="close"
							>
								취소
							</button>
							<button type="button" class="btn btn-primary" @click="addLecture">
								과목 등록하기
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { timeFilterFormat, dayFilterFormat } from '@/utils/filters.js';
export default {
	data() {
		return {
			days: ['월', '화', '수', '목', '금'],
			add_data: ['mon', 'tue', 'wed', 'thu', 'fri'],
		};
	},
	filters: {
		timeFilterFormat,
		dayFilterFormat,
	},
	computed: {
		// 팝업 상태값
		isShow() {
			return this.$store.state.lecture_popup;
		},
		// 중복되는 강의시 알림 팝업 상태값
		isOverlap() {
			return this.$store.state.overlap_lecture;
		},
		// 현재 선택된 강의
		currentLecture() {
			return this.$store.state.select_lecture;
		},
	},
	methods: {
		close: function() {
			this.$store.commit('SET_LECTURE_POPUP_STATUS', false);
			this.$store.commit('SET_OVERLAP_STATUS', false);
		},
		overlapFunc: function() {
			let _this = this;
			let store = this.$store.state;
			let overlap = false; // 겹침 여부
			let day_index = []; // 선택된강의 요일
			let day = this.currentLecture.dayofweek.split('');
			day.forEach(function(d) {
				let idx = _this.days.indexOf(d);
				day_index.push(idx);
			});

			let each_day_list = this.$store.getters.scheduleTable;

			// 요일
			day_index.forEach(function(d) {
				let arr = [];
				let s_time = []; // 선택강의 시간
				each_day_list[_this.add_data[d]].forEach(function(item) {
					let time = []; // 등록된 시간
					time.push(item.start_time, item.end_time);
					arr.push(time);
				});

				s_time.push(
					store.select_lecture.start_time,
					store.select_lecture.end_time,
				);

				arr.forEach(function(item) {
					if (overlap) {
						return;
					}
					let compare = [];
					compare.push(item, s_time);
					// 해당 요일 강의들 오름차순 정렬
					compare.sort(function(prev, cur) {
						return prev[1] - cur[1];
					});
					// 해당 요일의 강의 시간에 겹치는지 확인
					if (compare[0][1] <= compare[1][0]) {
						overlap = false;
					} else {
						overlap = true;
						return;
					}
				});
			});
			return overlap;
		},
		addLecture: function() {
			this.$store.commit('SET_LECTURE_POPUP_STATUS', false);
			let list = {};
			list.list = this.currentLecture;
			list.overlap = this.overlapFunc();
			this.$store.commit('ADD_LECTURE_LIST', list);
		},
	},
	mounted() {},
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
	> .wrap {
		.modal-dialog {
			animation: slide-in 0.3s ease;
		}
	}
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	> .wrap {
		.modal-dialog {
			opacity: 0;
			animation: slide-out 0.3s ease;
		}
	}
}
@keyframes slide-in {
	from {
		opacity: 0;
		top: 20%;
	}
	to {
		opacity: 1;
		top: 50%;
	}
}
@keyframes slide-out {
	from {
		opacity: 1;
		top: 50%;
	}
	to {
		opacity: 0;
		top: 20%;
	}
}
.modal-popup {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 9;
	background: rgba(0, 0, 0, 0.5);

	> .wrap {
		position: relative;
		width: 100%;
		height: 100%;

		.modal-dialog {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			transition: all 0.3s ease;
		}
	}
}

.modal-header {
	border-bottom: 0;
}

.modal-body {
	padding: 0 2rem 2rem;

	.lecture-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #000;
	}

	.lecture-info {
		margin-top: 2rem;

		.ic-lecture-info {
			margin-right: 0.5rem;
			font-size: 1.25rem;
		}

		li {
			display: flex;
			align-items: center;
			margin-bottom: 0.125rem;
			font-size: 1.125rem;
			font-weight: 500;
			line-height: 1.6;
			color: #263747;
		}
	}

	.lecture-description,
	.lecture-memo {
		margin-top: 1rem;
	}

	.lecture-description .txt-description,
	.lecture-memo .txt-description {
		margin-bottom: 0;
		font-weight: 400;
	}

	.lecture-description .memo-list,
	.lecture-memo .memo-list {
		display: flex;
	}

	.lecture-description .memo-list .memo-content,
	.lecture-memo .memo-list .memo-content {
		max-width: 20rem;
	}

	.lecture-description .memo-list .memo-content .ic-lecture-noti,
	.lecture-memo .memo-list .memo-content .ic-lecture-noti {
		vertical-align: sub;
		font-size: 1.25rem;
	}

	.lecture-description .memo-list .memo-content .lecture-noti-title,
	.lecture-memo .memo-list .memo-content .lecture-noti-title {
		font-size: 1.125rem;
	}

	.lecture-description .memo-list .memo-btn,
	.lecture-memo .memo-list .memo-btn {
		margin-left: auto;
	}

	.lecture-description .memo-list .memo-btn .ic-lecture-noti,
	.lecture-memo .memo-list .memo-btn .ic-lecture-noti {
		color: #b2c0cc;
	}

	.lecture-description .memo-list .memo-btn .ic-lecture-noti:hover,
	.lecture-memo .memo-list .memo-btn .ic-lecture-noti:hover {
		color: #f44336;
	}

	.lecture-description {
		background-color: #f7f7fb;
		border-radius: 0.75rem;
		padding: 1rem;
	}

	.lecture-memo .form-group {
		margin-bottom: 0;

		label {
			margin-bottom: 0.25rem;

			&:hover {
				cursor: pointer;
			}

			input {
				margin-right: 0.25rem;

				&:hover {
					cursor: pointer;
				}
			}
		}
	}
}

.modal-footer {
	.left {
		margin-right: auto;
	}

	.right {
		display: flex;

		.btn-danger {
			margin-left: 0.375rem;
		}
	}

	.btn {
		font-weight: 500;
	}

	.btn-light {
		background-color: #e9ecf3;
		border-color: #e9ecf3;
		font-weight: 500;

		&:hover {
			color: #263747;
			background-color: #d7e2eb;
			border-color: #d7e2eb;
		}
	}

	.btn-light-danger {
		color: #f44336;
		background-color: #ffebee;
		border-color: #ffebee;

		&:hover {
			color: #d32f2f;
			background-color: #ffdde0;
			border-color: #ffdde0;
		}
	}

	.btn-light-primary {
		color: #0078ff;
		background-color: #eeebff;
		border-color: #eeebff;

		&:hover {
			color: #0053f4;
			background-color: #d8ddff;
			border-color: #d8ddff;
		}
	}
}
</style>
