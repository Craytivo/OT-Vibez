# GA4 Event Setup (FAQ + Affiliate)

This project now sends these custom events from the homepage FAQ component:

- `faq_item_toggle`
- `faq_topic_select`
- `faq_visibility_toggle`
- `affiliate_click`

## Event Parameters Sent

- `event_category`
- `event_label`
- `faq_state` (`opened` or `closed`) for `faq_item_toggle`
- `affiliate_url` for `affiliate_click`

## Where They Fire

- File: `src/index.src.html`
- Component: `faqComponent()`

## GA4 Dashboard Setup Steps

1. Open GA4 Admin.
2. Go to `Custom definitions`.
3. Create event-scoped custom dimensions for:
   - `event_category`
   - `event_label`
   - `faq_state`
   - `affiliate_url`
4. Go to `Reports > Engagement > Events` and confirm events are incoming.
5. Build an exploration with:
   - Rows: `eventName`
   - Columns: `event_label`
   - Metrics: `Event count`
6. Add a filter for `eventName` contains `faq_` or equals `affiliate_click`.

## Suggested Conversion Checks

- Compare `affiliate_click` volume vs `book_now_click`.
- Compare FAQ topic usage (`faq_topic_select`) vs booking clicks in same session.
- Track whether `faq_item_toggle` depth correlates with higher booking intent.
