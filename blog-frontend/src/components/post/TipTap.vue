<template>
	<div class="editor">
		<div v-if="editor" class="menubar">
			<button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
				bold
			</button>
			<button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
				italic
			</button>
			<button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
				strike
			</button>
			<button type="button" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
				code
			</button>
			<button type="button" @click="editor.chain().focus().unsetAllMarks().run()">
				clear marks
			</button>
			<button type="button" @click="editor.chain().focus().clearNodes().run()">
				clear nodes
			</button>
			<button type="button" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
				paragraph
			</button>
			<button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
				h1
			</button>
			<button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
				h2
			</button>
			<button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
				h3
			</button>
			<button type="button" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
				h4
			</button>
			<button type="button" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
				h5
			</button>
			<button type="button" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
				h6
			</button>
			<button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
				bullet list
			</button>
			<button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
				ordered list
			</button>
			<button type="button" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
				code block
			</button>
			<button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
				blockquote
			</button>
			<button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
				horizontal rule
			</button>
			<button type="button" @click="editor.chain().focus().setHardBreak().run()">
				hard break
			</button>
			<button type="button" @click="editor.chain().focus().undo().run()">
				undo
			</button>
			<button type="button" @click="editor.chain().focus().redo().run()">
				redo
			</button>
			
		</div>

		<editor-content class="editor-content content-area" :editor="editor" />
	</div>
</template>

<script setup>
// eslint-disable-next-line
import { useEditor, EditorContent } from '@tiptap/vue-3'
// eslint-disable-next-line
import StarterKit from '@tiptap/starter-kit'

const props = defineProps(['content'])
const emit = defineEmits(['contentUpdated'])

const editor = useEditor({
	extensions: [
		StarterKit,
	],
	content: props.content,
	onUpdate: () => {
		emit('contentUpdated', editor.value.getHTML())
	}
})
</script>


<style scoped>
.editor {
	padding: 12px 0;
}

.menubar {
	background: var(--secondary_bg);
	padding: 8px;
	margin-bottom: 2px;
}

.content-area {
	background: var(--secondary_bg);
	padding: 20px;
}

.menubar span {
	cursor: pointer;
	padding: 8px 6px;
	background: var(--third_bg);

}
</style>