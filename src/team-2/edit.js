import { __ } from "@wordpress/i18n";
import {
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";

import { ToolbarButton, ToolbarGroup, PanelBody } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes, context }) {
	const {
		image = {},
		content,
		paragraph,
		nameColor,
		nameFontSize,
		contentBg,
		imageBg,
		titleColor,
		titleFontSize,
		ctaAlign,
		ctaMargin,
		imageHeight,
	} = attributes;
	const blockProps = useBlockProps();
	useEffect(() => {
		setAttributes({
			nameColor: context["create-block/nameColor"],
			nameFontSize: context["create-block/nameFontSize"],
			contentBg: context["create-block/contentBg"],
			imageBg: context["create-block/imageBg"],
			titleColor: context["create-block/titleColor"],
			titleFontSize: context["create-block/titleFontSize"],
		});
	}, [context]);

	return (
		<>
			{image?.url && (
				<BlockControls>
					<ToolbarGroup>
						<MediaUpload
							onSelect={(v) =>
								setAttributes({
									image: {
										url: v?.url,
										alt: v?.alt,
										id: v?.id,
									},
								})
							}
							allowedTypes={["image"]}
							value={image?.id}
							render={({ open }) => (
								<ToolbarButton
									icon="edit"
									title={__("Edit", "your-text-domain")}
									onClick={open}
								/>
							)}
						/>
					</ToolbarGroup>
				</BlockControls>
			)}

			<div {...blockProps}>
				<div className="profile-card">
					<div className="profile-image">
						{image?.url ? (
							<img
								src={image.url}
								alt={image.alt || __("Image", "your-text-domain")}
							/>
						) : (
							<MediaPlaceholder
								onSelect={(v) =>
									setAttributes({
										image: {
											url: v?.url,
											alt: v?.alt,
											id: v?.id,
										},
									})
								}
								allowedTypes={["image"]}
								multiple={false}
								labels={{ title: __("The Image", "your-text-domain") }}
							/>
						)}
					</div>
					<div className="profile-info">
						<RichText
							tagName="h3"
							value={content}
							onChange={(v) => setAttributes({ content: v })}
							placeholder={__("Title", "your-text-domain")}
							className="title"
						/>

						<RichText
							tagName="p"
							value={paragraph}
							onChange={(v) => setAttributes({ paragraph: v })}
							placeholder={__("Paragraph", "your-text-domain")}
							className="name"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
