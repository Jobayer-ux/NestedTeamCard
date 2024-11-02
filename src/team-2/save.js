import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		image = {},
		content,
		nameColor,
		paragraph,
		titleColor,
		titleFontSize,
		contentBg,
		imageBg,
		nameFontSize,
	} = attributes;
	return (
		<div {...useBlockProps.save()}>
			<div className="profile-card">
				<div className="profile-image">
					<img src={image?.url} alt={image?.alt} />
				</div>
				<div className="profile-info">
					<h3 className="title">{content}</h3>
					<p className="name">{paragraph}</p>
				</div>
			</div>
		</div>
	);
}
