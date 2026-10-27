# Nexvita roadmap

Status: the one-page website is live. Items below are planned, in the order we expect to do them. Nothing here needs passwords or keys to be stored in this repository.

1. Fill in the placeholder text (About, Physio, Yoga, Where and when, FAQs, Contact) once the councils have replied.
2. Online booking: Cal.com embeds for each activity, synced to Google Calendar, payment through Stripe (PayPal to be checked on the free plan). A physio slot disappears once booked; yoga classes show as full at capacity.
3. Member history page (to be revised later):
   - Sign in with Google (other providers possible later). The site never asks for a name or email.
   - Only a scrambled (hashed) sign-in ID and a made-up membership number are stored.
   - The page shows the membership number and the session history only: date, activity and status. No health information or notes of any kind.
   - Bookings are linked to a member through Cal.com notifications; the email address is discarded straight after linking.
   - Needs a short privacy notice (a scrambled ID is still personal data under UK GDPR).
4. More activities: add a block to `src/data/activities.json`.

Status note (October 2026): physio Cal.com booking (popup) is live on the site, open 1 May to 30 September 2027 only; extend the range in Cal.com when reviewed. Online payment not yet enabled. See README for how to add a booking link for a new activity.
