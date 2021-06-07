<template>
	<section class="section-nav">
		<form id="search-form" class="form-search" @submit.prevent="submitSearch">
			<input
				type="text"
				placeholder="강의 검색"
				class="form-control"
				@input="searching"
			/>
			<span><i class="material-icons ic-search">search</i></span>
		</form>
		<template v-if="lectureList.length > 0">
			<ul
				:key="list.code"
				v-for="list in lectureList"
				class="list-lecture"
				@click="openPopup(list)"
			>
				<li class="card-lecture">
					<a class="lecture-title" href="#">{{ list.lecture }}</a>
					<h6 class="lecture-time">
						<i class="material-icons ic-lecture-info">access_time</i>
						<span
							>{{ list.start_time | timeFilterFormat }} -
							{{ list.end_time | timeFilterFormat }} |
							{{ list.dayofweek | dayFilterFormat }}</span
						>
					</h6>
					<ul class="list-lecture-info">
						<li>교과목 코드 : {{ list.code }}</li>
						<li>담당 교수 : {{ list.professor }}</li>
						<li>강의실 : {{ list.location }}</li>
					</ul>
				</li>
			</ul>
		</template>
		<template v-else>
			<p class="lecture_empty">검색 결과가 없습니다.</p>
		</template>
	</section>
</template>

<script>
import { timeFilterFormat, dayFilterFormat } from '@/utils/filters.js'; // 시간, 요일 변환
import data from '@/api/courses.json';
export default {
	data() {
		return {
			data: [],
			search_value: '',
		};
	},
	filters: {
		timeFilterFormat,
		dayFilterFormat,
	},
	created() {
		this.data = data;
	},
	computed: {
		lectureList() {
			if (this.search_value.length == '') {
				return this.data;
			}

			return this.data.filter(item => {
				if (this.search_value.length > 0) {
					// 교과목 코드
					if (item.code.toLowerCase().indexOf(this.search_value) != -1) {
						return item;
					}
					// 강의명
					if (item.lecture.toLowerCase().indexOf(this.search_value) != -1) {
						return item;
					}
					// 교수이름
					if (item.professor.toLowerCase().indexOf(this.search_value) != -1) {
						return item;
					}
				}
			});
		},
	},
	methods: {
		searching: function(e) {
			this.search_value = e.target.value.toLowerCase();
		},
		openPopup: function(list) {
			this.$store.commit('SET_LECTURE_POPUP_STATUS', true);
			this.$store.commit('CURRENT_LECTURE', list);
		},
	},
};
</script>

<style lang="scss">
.section-nav {
	width: 25rem;
	max-height: 100vh;
	overflow-y: scroll;
	border-right: 0.0625rem solid #d7e2eb;

	.form-control {
		font-size: 16px;
		line-height: 1.6;
		letter-spacing: -0.009em;
		padding: 0.3125rem 0.75rem 0.3125rem 2.5rem;
		border: 0.0625rem solid #d7e2eb;

		&::placeholder {
			color: #98a8b9;
		}
	}

	.ic-search {
		position: absolute;
		transform: translateY(-50%);
		top: 2.625rem;
		left: 2rem;
		color: #98a8b9;
	}

	.lecture_empty {
		text-align: center;
		padding: 20px;
	}

	.list-lecture {
		padding-left: 0;

		.card-lecture {
			margin-top: 1rem;
			padding: 1rem;
			border: 0.0625rem solid #d7e2eb;
			border-radius: 0.5rem;

			.lecture-title {
				font-size: 20px;
				line-height: 1.6;
				letter-spacing: -0.009em;
				font-weight: 600;
			}

			&:hover {
				background-color: #eeebff;
				border: 0.0625rem solid #0078ff;
				cursor: pointer;

				.list-lecture-info {
					color: #0078ff;
				}
			}
		}

		.lecture-time {
			font-size: 16px;
			line-height: 1.6;
			letter-spacing: -0.009em;
			display: flex;
			align-items: center;
			margin-bottom: 0.25rem;
			color: #263747;

			.ic-lecture-info {
				margin-right: 0.25rem;
				font-size: 1.125rem;
				font-weight: 700;
			}

			span {
				padding-top: 0.0625rem;
			}
		}

		.list-lecture-info {
			font-size: 14px;
			line-height: 1.5;
			color: #98a8b9;
		}
	}
}

.section-list {
	width: calc(100% - 25rem);
	padding-bottom: 7.5rem;
}
</style>
