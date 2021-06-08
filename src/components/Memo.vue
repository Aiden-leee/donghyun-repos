<template>
	<div id="PopoverContent" class="memo" ref="memo">
		<h5 class="schedule-title">메모 등록하기</h5>
		<div class="form-group">
			<label class="col-form-label"
				>제목
				<input
					type="text"
					class="form-control"
					id="recipient-name"
					placeholder="제목 추가"
					@input="setTitle"
					:value="title"
					autocomplete="off"
				/>
			</label>
		</div>
		<div class="form-group">
			<label for="message-text" class="col-form-label">설명</label>
			<textarea
				class="form-control"
				id="message-text"
				rows="4"
				placeholder="설명 추가"
				@input="setTextarea"
				:value="textarea"
				autocomplete="off"
			></textarea>
		</div>
		<button type="button" class="btn btn-primary btn-save" @click="addMemo">
			등록
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			textarea: '',
		};
	},
	computed: {
		currentLecture() {
			return this.$store.state.select_lecture;
		},
	},
	methods: {
		setTitle: function(e) {
			this.title = e.target.value;
		},
		setTextarea: function(e) {
			this.textarea = e.target.value;
		},
		addMemo: function() {
			let val = {};
			val.title = this.title;
			val.des = this.textarea;
			this.$emit('addMemo', val);
			this.title = '';
			this.textarea = '';
		},
	},
};
</script>

<style lang="scss">
.memo {
	text-align: left;
	padding: 0 10px;
	> .schedule-title {
		margin: 1rem 10px 1.5rem;
		text-align: left;
		font-size: 1.25rem;
		font-weight: 500;
	}
	.from-group {
		position: relative;
		margin-bottom: 0.5rem;
		label {
			width: 100%;
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
	}
	.form-control {
		display: block;
		width: 100%;
		// height: calc(2.25rem + 2px);
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}
	.btn-save {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
}
</style>
