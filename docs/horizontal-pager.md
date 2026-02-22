# Horizontal Pager (Onboarding) - Full Guide

## Overview

This document explains how the onboarding horizontal pager is implemented in this project and how to maintain it without changing your UI design.

Current implementation location:

- `ios/ShoesApp/src/presentation/screens/onboardingScreen.tsx`
- `ios/ShoesApp/src/constants/onBoardingData.ts`
- `ios/ShoesApp/src/presentation/components/DotIndicator.tsx`

The screen uses a `FlatList` with horizontal paging. Each item is one onboarding slide, and the active slide index is synced to both:

- the dot indicator
- the button label (`Get Started` on first slide, `Next` on other slides)

The `NIKE1.png` image is intentionally fixed (unscrollable), while slide content scrolls.
The dot indicator and button are also fixed (unscrollable), while slide content scrolls behind them.

## Architecture

### 1) Data Layer

`onBoardingData.ts` is the single source of truth for slides.

- `id`: unique key for each slide
- `image`: local asset via `require(...)`
- `title`: heading text
- `description`: supporting text

Benefits:

- easy to add/remove/reorder slides
- UI logic stays clean and reusable

### 2) Presentation Layer

`onboardingScreen.tsx` handles:

- rendering the horizontal pager
- calculating current index after swipe
- moving to next slide on button click
- showing dynamic button text
- keeping fixed background assets separate from scrolling content
- rendering fixed controls (dot indicator + CTA button) outside the pager

### 3) Reusable UI Component

`DotIndicator.tsx` is generic:

- accepts `currentIndex`
- accepts `total`
- does not depend on onboarding data directly

This makes it reusable for any future paged screen.

## Core Pager Logic

### Horizontal Paging

The pager uses:

- `horizontal`
- `pagingEnabled`
- `decelerationRate="fast"`
- `bounces={false}`
- `showsHorizontalScrollIndicator={false}`

This creates a clean page-by-page swipe experience.

### Stable Layout for Performance

`getItemLayout` is provided:

```tsx
getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
```

Why it matters:

- enables reliable `scrollToIndex`
- avoids measurement delays
- improves paging smoothness

### Index Synchronization

`onMomentumScrollEnd` computes the active page:

```tsx
const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
setCurrentIndex(nextIndex);
```

This keeps indicator and button state in sync with user swipes.

## Button Behavior

Current rule:

- first slide (`index === 0`) -> `Get Started`
- all other slides -> `Next`

Button press logic:

- if not on last slide, scroll to next slide programmatically
- if on last slide, currently no action (safe no-op)

If needed later, you can add navigation on last slide (for example to login/home).

## Fixed (Unscrollable) NIKE Image

To keep `NIKE1.png` static:

- it is rendered outside the `FlatList`
- it is positioned in the pager wrapper as a fixed visual layer
- only slide content is inside each list item

This prevents the Nike background from moving during horizontal swipe.

## Fixed (Unscrollable) Controls

To keep the dot indicator and button static:

- they are rendered outside `renderItem`
- they are placed in an absolutely-positioned container over the pager
- only per-slide content (image/title/description) is inside each list item

This keeps controls anchored in one place while swiping between pages.

## Styling Structure

Important style groups in `onboardingScreen.tsx`:

- `container`: full screen wrapper
- `pagerWrapper`: parent around static Nike image and scrolling pager
- `nikeStatic`: fixed Nike background image
- `slide`: one page container, width tied to screen width
- `nikeContent`: slide content block aligned with your existing UI
- `next`: row containing dot indicator and CTA button

This split keeps layout readable and easier to modify safely.

## How to Add New Slides

1. Open `ios/ShoesApp/src/constants/onBoardingData.ts`.
2. Add a new item with unique `id`, valid `image`, `title`, and `description`.
3. Save. Dot count and paging length update automatically.

No changes are required in:

- `DotIndicator.tsx` (already dynamic via `total`)
- paging logic in `onboardingScreen.tsx`

## Common Issues and Fixes

### Dot not matching slide

Cause:

- index not updated after swipe

Fix:

- verify `onMomentumScrollEnd` is connected and computing index from `contentOffset.x / width`

### `scrollToIndex` fails

Cause:

- missing/incorrect `getItemLayout`
- index out of bounds

Fix:

- keep `getItemLayout`
- clamp next index between `0` and `lastIndex`

### Background scrolls unexpectedly

Cause:

- static image moved back inside `renderItem`

Fix:

- keep `NIKE1.png` rendered outside the `FlatList`

## Best Practices Used Here

- data-driven slides (clean separation of concerns)
- reusable dot component
- typed onboarding model (`OnBoardingItem`)
- explicit index control for consistent UI state
- fixed decorative background separated from content pager

## Optional Enhancements

1. Add `onPress` behavior on last slide (navigate to auth/home).
2. Change button text on last slide only (for example `Start`).
3. Add accessibility labels for dots and CTA button.
4. Add slide enter animations (while keeping same visual design).
