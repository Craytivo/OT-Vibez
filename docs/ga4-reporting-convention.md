# GA4 Reporting Convention

Use these custom event parameters in GA4 custom dimensions/metrics:

- `analytics_test` (Event scope)
- `analytics_variant` (Event scope)
- `analytics_context` (Event scope)
- `filter_category` (Event scope)
- `service_name` (Event scope)
- `expanded_before_book` (Event scope)

## Event map

- `book_now_click`
  - Shared CTA click event.
  - Hero CTA includes `analytics_test=hero_primary_cta_v1` and `analytics_variant`.
  - Service card booking includes `service_name`, `filter_category`, `expanded_before_book`.

- `ab_variant_assigned`
  - Fired once when hero CTA variant is first assigned.

- `services_filter_use`
  - Fired when services filter buttons are used.
  - Includes `filter_category`.

- `service_card_expand`
  - Fired when a service card details block is expanded.
  - Includes `service_name`, `filter_category`.

## Dashboard suggestions

1. Hero CTA variant conversions:
   - Filter `event_name=book_now_click` and `analytics_test=hero_primary_cta_v1`
   - Breakdown by `analytics_variant`

2. Services filter usage:
   - `event_name=services_filter_use`
   - Breakdown by `filter_category`

3. Detail-expansion-to-book rate:
   - Numerator: `event_name=book_now_click` with `expanded_before_book=true`
   - Denominator: `event_name=service_card_expand`
   - Breakdown by `service_name`