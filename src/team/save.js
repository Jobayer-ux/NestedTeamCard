import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
export default function save({ attributes }) {
	const { style } = attributes;
	return (
		<>
			<style>{style}</style>
			<div {...useBlockProps.save()}>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
