# Generating a flyer for a BayRaagis Event

## General guidelines

- Flyers must be square, for instagram-friendly viewing, unless otherwise specified.
- If it needs too many additional details, move them into multiple pages for a carousel.
- All text has to be readable from a mobile device without zooming in.
- Take care of small aesthetic details: matching visual indents, even margins, elements
not too close to each other, using not more than 2 or 3 fonts, etc.

## Branding

- `assets/bayraagis-logo.png` has our logo. You may change the hue or apply a filter to make
the logo match the poster. You may make the background transparent when necessary.
- Please use the Begum font family, or something similar. You may use something complementary for
occasional flourishes/banners/CTAs.
- There are no brand colors. Poster colors should be set by taking into account the type of event
(community gathering, bollywood jam, hindustani classical, fusion, etc.), season/theme, etc.
- The logo should preferably be on the left of the poster, occupying between 1/6-1/4th of the area in width.
- The date/time/venue details should be roughly near the lower center of the flyer.
- You may initially try out different alignments, placements, and templates, but eventually we want to
converge to something and build familiarity.

## Elements of a Flyer

- Title
- Subtitle (optional)
- Date & Time
- Location: venue name, address, and city
- Event fee / "free event"
- QR code for tickets/RSVP (optional)
- Organizing partners & their logo (optional)
- Additional info (optional)
    - If this is short, add to the same page (e.g., sponsor, 1-liner parking/food info)
    - If this is long, make a new page (e.g., guest artist blurb, detailed parking/food info, supoprted cuase/event)

## QR code:

Please use https://www.qrcode-monkey.com/qr-code-api-with-logo/ to generate one.
Use the user-provided link, and appropriately chosen high-contrast
body and background colors for the design

```
{
    "data": "<enter your link>",
    "config": {
        "body": "circle",
        "eye": "frame12",
        "eyeBall": "ball14",
        "bodyColor": "#<enter your body color>",
        "bgColor": "#<enter your background color>",
    },
    "size": 500,
    "file": "png"
}
```