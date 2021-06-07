<template>
	<transition name="fade">
		<div class="modal-popup" v-if="isShow" id="modal-lecture-info">
			<div class="wrap" :class="{ show: isShow }">
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
							<div class="lecture-memo">
								<h5 class="memo-header">메모</h5>
								<ul>
									<li class="memo-list">
										<div
											class="memo-content"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"
										>
											<i class="material-icons ic-lecture-noti">assignment</i>
											<span class="lecture-noti-title">과제 제목 텍스트</span>
										</div>
										<div class="memo-btn">
											<a href=""
												><i class="material-icons ic-lecture-noti">delete</i></a
											>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="modal-footer">
							<div class="left">
								<Popper
									trigger="clickToOpen"
									:options="{
										placement: 'top',
										modifiers: { offset: { offset: '0,10px' } },
									}"
								>
									<div class="popper">
										<Memo @addMemo="addMemo" />
									</div>
									<button
										slot="reference"
										class="btn btn-light-primary"
										type="button"
										data-toggle="popover"
										data-trigger="click"
										data-placement="right"
										data-html="true"
									>
										메모 등록
									</button>
								</Popper>
							</div>
							<div class="right">
								<button
									type="button"
									class="btn btn-light"
									data-dismiss="modal"
									@click="close"
								>
									확인
								</button>
								<button
									type="button"
									class="btn btn-danger"
									@click="deleteLecture"
								>
									과목 삭제하기
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { timeFilterFormat, dayFilterFormat } from '@/utils/filters.js';
import Memo from '@/components/Memo.vue';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
export default {
	data() {
		return {};
	},
	components: {
		Popper,
		Memo,
	},

	filters: {
		timeFilterFormat,
		dayFilterFormat,
	},
	computed: {
		isShow() {
			return this.$store.state.lecture_memo_popup;
		},
		currentLecture() {
			return this.$store.state.select_lecture;
		},
	},
	methods: {
		addMemo: function(val) {
			let _this = this;
			console.log(val);
			let day = this.$store.state.select_day;
			console.log(this.$store.getters.eachDaySchedule[day]);
			this.$store.getters.eachDaySchedule[day].forEach(function(item) {
				if (item.code == _this.currentLecture.code) {
					item.memo.push(val);
				}
			});

			console.log(this.$store.getters.eachDaySchedule);
		},
		close: function() {
			this.$store.commit('EDIT_LECTURE_MEMO_POPUP', []);
			this.$store.commit('SET_LECTURE_MEMO_STATUS', false);
		},
		deleteLecture: function() {
			this.$store.commit('DELETE_LECTURE', this.currentLecture.code);
		},
	},
	mounted() {},
};
</script>

<style lang="scss">
.lecture-description,
.lecture-memo {
	margin-top: 1rem;
	> h5 {
		font-size: 1.25rem;
		color: #000;
		font-weight: bold;
	}
	> ul {
		margin-top: 10px;
	}
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
	color: #000;
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
</style>
