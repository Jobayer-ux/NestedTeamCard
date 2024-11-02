import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	PanelColorSettings,
} from "@wordpress/block-editor";
import {
	PanelBody,
	FontSizePicker,
	BaseControl,
	RangeControl,
	SelectControl,
} from "@wordpress/components";
import "./editor.scss";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import React from "react";

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const {
		nameColor,
		nameFontSize,
		contentBg,
		imageBg,
		titleColor,
		titleFontSize,
		style,
		ctaAlign,
		ctaMargin = { top: 0, right: 0, bottom: 0, left: 0 },
		imageHeight = 200,
	} = attributes;

	// Using useBlockProps correctly
	const innerBlocksProps = useInnerBlocksProps(useBlockProps(), {
		allowedBlocks: ["create-block/team-2"],
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	// Dynamic styles
	const customStyle = `
		p.name {
			color: ${nameColor};
			font-size: ${nameFontSize}px;
		}
		h3.title {
			color: ${titleColor};
			font-size: ${titleFontSize}px;
		}
		.profile-image {
			height: ${imageHeight}px;
		}
		.profile-info {
			background-color: ${contentBg};
			text-align: ${ctaAlign};
			margin: ${ctaMargin.top}px ${ctaMargin.right}px ${ctaMargin.bottom}px ${ctaMargin.left}px;
		}
		.image {
			background-color: ${imageBg};
		}
	`;

	// Update style attribute only when dependencies change
	React.useEffect(() => {
		setAttributes({ style: customStyle });
	}, [
		nameColor,
		nameFontSize,
		titleColor,
		titleFontSize,
		contentBg,
		imageBg,
		imageHeight,
		ctaAlign,
		ctaMargin,
	]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Content Width", "create-block")}>
					<SelectControl
						label={__("Content Alignment", "create-block")}
						value={ctaAlign}
						options={[
							{ label: __("Left", "create-block"), value: "left" },
							{ label: __("Center", "create-block"), value: "center" },
							{ label: __("Right", "create-block"), value: "right" },
						]}
						onChange={(v) => setAttributes({ ctaAlign: v })}
					/>
				</PanelBody>
				<PanelBody title={__("Typography", "create-block")}>
					<BaseControl label={__("Title", "create-block")}>
						<FontSizePicker
							fontSizes={[
								{ name: __("small", "create-block"), slug: "small", size: 12 },
								{
									name: __("regular", "create-block"),
									slug: "regular",
									size: 16,
								},
								{ name: __("large", "create-block"), slug: "large", size: 36 },
								{
									name: __("larger", "create-block"),
									slug: "larger",
									size: 48,
								},
							]}
							value={titleFontSize}
							onChange={(v) => setAttributes({ titleFontSize: v })}
						/>
					</BaseControl>
					<BaseControl label={__("Name", "create-block")}>
						<FontSizePicker
							fontSizes={[
								{ name: __("small", "create-block"), slug: "small", size: 12 },
								{
									name: __("regular", "create-block"),
									slug: "regular",
									size: 16,
								},
								{ name: __("large", "create-block"), slug: "large", size: 36 },
								{
									name: __("larger", "create-block"),
									slug: "larger",
									size: 48,
								},
							]}
							value={nameFontSize}
							onChange={(v) => setAttributes({ nameFontSize: v })}
						/>
					</BaseControl>
				</PanelBody>

				<PanelColorSettings
					title={__("Colors", "create-block")}
					initialOpen={false}
					colorSettings={[
						{
							value: nameColor,
							onChange: (v) => setAttributes({ nameColor: v }),
							label: __("Name Color", "create-block"),
						},
						{
							value: titleColor,
							onChange: (v) => setAttributes({ titleColor: v }),
							label: __("Title Color", "create-block"),
						},
						{
							value: contentBg,
							onChange: (v) => setAttributes({ contentBg: v }),
							label: __("Content Background", "create-block"),
						},
						{
							value: imageBg,
							onChange: (v) => setAttributes({ imageBg: v }),
							label: __("Image Background", "create-block"),
						},
					]}
				/>
				<PanelBody title={__("Image", "create-block")}>
					<RangeControl
						label={__("Image Height", "create-block")}
						value={imageHeight}
						onChange={(v) => setAttributes({ imageHeight: v })}
						min={50}
						max={400}
					/>
					<BoxControl
						label={__("CTA Margin", "create-block")}
						values={{
							top: ctaMargin.top,
							right: ctaMargin.right,
							bottom: ctaMargin.bottom,
							left: ctaMargin.left,
						}}
						onChange={(v) => setAttributes({ ctaMargin: v })}
					/>
				</PanelBody>
			</InspectorControls>

			<style>{customStyle}</style>

			<div {...innerBlocksProps} />
		</>
	);
}
