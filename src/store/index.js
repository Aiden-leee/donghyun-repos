import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		schedule: [], // 등록한 강의 목록
		lecture_popup: false, // 팝업 상태
		lecture_memo_popup: false, // 등록된 강의의 팝업상태
		overlap_lecture: false, // 강의 겹침 상태값
		select_lecture: [], // 현재 선택된 강의
		select_day: '', // 현재 선택된 강의 요일
		schedule_list: {
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
		},
	},
	getters: {
		scheduleTable: function(state) {
			return state.schedule_list;
		},
	},
	mutations: {
		// 현재 선택한 강의
		CURRENT_LECTURE: function(state, payload) {
			state.select_lecture = payload;
		},
		// 강의 목록 선택시 팝업
		SET_LECTURE_POPUP_STATUS: function(state, payload) {
			state.lecture_popup = payload;
		},
		// 겹침 여부
		SET_OVERLAP_STATUS: function(state, payload) {
			state.overlap_lecture = payload;
		},
		// 등록된 강의 선택시의 팝업 데이터 넘기기
		EDIT_LECTURE_MEMO_POPUP: function(state, payload) {
			state.select_lecture = [];
			state.select_lecture = payload[0];
			state.select_day = payload[1];
		},
		// 등록된 강의 선택시 팝업 disable 여부
		SET_LECTURE_MEMO_STATUS: function(state, payload) {
			state.lecture_memo_popup = payload;
		},
		// 등록된 강의 삭제
		DELETE_LECTURE: function(state, payload) {
			let add_data = ['mon', 'tue', 'wed', 'thu', 'fri'];
			let result;
			add_data.forEach(function(day) {
				result = state.schedule_list[day].filter(function(item) {
					return item.code != payload;
				});
				state.schedule_list[day] = result;
			});

			state.lecture_memo_popup = false;
		},
		// 스케쥴에 강의 등록
		ADD_LECTURE_LIST: function(state, payload) {
			// 겹치는 시간 상태값
			if (payload.overlap) {
				state.overlap_lecture = true;
				return;
			}
			// 이미 등록된 강의 있는지 확인
			let result = state.schedule.some(function(el) {
				return el.code == payload.list.code;
			});
			if (!result) {
				// state.schedule.push(payload.list);
				transform_list(payload.list);
			}

			function transform_list(data) {
				let days = ['월', '화', '수', '목', '금'];
				let add_data = ['mon', 'tue', 'wed', 'thu', 'fri'];
				let options = {};
				options.day_index = [];
				let day = data.dayofweek.split('');
				day.forEach(function(d) {
					let idx = days.indexOf(d);
					options.day_index.push(idx);
				});

				options.day_index.forEach(function(d) {
					state.schedule_list[add_data[d]].push(data);
				});
			}
			state.select_lecture = [];
		},
	},
});
