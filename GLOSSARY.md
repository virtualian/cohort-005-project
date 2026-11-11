# Cadence

Cadence sells online video courses. Instructors publish courses; students buy them, alone or for a team, and work through them lesson by lesson.

## People and roles

**User**:
Anyone with an account on the platform.
_Avoid_: Account, customer

**Student**:
A User with an Enrollment in a course.
_Avoid_: Learner, member, customer

**Student role**:
The platform role given to Users who are not Instructors or Admins.

**Buyer**:
The User who made a Purchase. A Buyer is not necessarily a Student of that course: a Team Purchase does not enroll its Buyer.
_Avoid_: Purchaser, customer

**Instructor**:
A User with the platform role that may create and publish courses.
_Avoid_: Teacher, author, creator, seller

**Course Owner**:
The User a course belongs to. Usually an Instructor, but an Admin can own a course too.
_Avoid_: Owning instructor

**Admin**:
A User with the platform-wide administrator role.

**Staff**:
For a given course, its Course Owner or any Admin.

## Catalogue and structure

**Course**:
A sellable unit of teaching, made of ordered Modules.

**Module**:
An ordered group of Lessons within a Course.
_Avoid_: Section, chapter

**Lesson**:
A single item of teaching within a Module, optionally with a video and a Quiz.
_Avoid_: Unit, video

**Curriculum**:
The ordered list of Modules and Lessons in a Course.
_Avoid_: Course content

**Category**:
The single subject grouping a Course is listed under.
_Avoid_: Topic, tag

**Description**:
The short summary of a Course shown on course cards and in search.

**Sales Copy**:
The long-form body of a Course's landing page.

**Course Status**:
Whether a Course is Draft, Published or Archived.

## Buying and access

**Purchase**:
A payment by a Buyer for a Course.
_Avoid_: Order, sale

**Enrollment**:
A Student's place on a Course.
_Avoid_: Join, own (for students)

**Access**:
Permission to view a Course's Lessons, held by its Students and its Staff.

**Team**:
A group that owns Seats bought through a Team Purchase.

**Team Purchase**:
A single Purchase of several Seats in one Course.

**Seat**:
One place on a Course bought through a Team Purchase.

**Seat Code**:
The code, shared as a link, that lets one person Claim a Seat.
_Avoid_: Coupon, coupon code, coupon link, invite

**Claim**:
To use a Seat Code, which gives the claimer an Enrollment.
_Avoid_: Redeem, use

**Seat Holder**:
A User who has Claimed a Seat.
_Avoid_: Team member (for this meaning)

**Team Manager**:
The User who manages a Team's Seats and Seat Codes.
_Avoid_: Admin (for this meaning), manager

**Team Member**:
A User formally belonging to a Team. Not the same as a Seat Holder.

## Pricing and money

**List Price**:
The price set on a Course.
_Avoid_: Original price, full price

**PPP Discount**:
The percentage taken off the List Price based on the Buyer's country.
_Avoid_: Parity pricing, parity discount, location-based discount, purchasing-power price

**PPP Price**:
The List Price after the PPP Discount.
_Avoid_: Parity-adjusted price, your price

**Amount Paid**:
What a single Purchase actually cost the Buyer.
_Avoid_: Spend, sale

**Gross Revenue**:
The total Amount Paid across a Course's Purchases.

**Platform Fee**:
The share of Gross Revenue the platform keeps.
_Avoid_: Cut

**Net Earnings**:
Gross Revenue minus the Platform Fee, owed to the Course Owner.

## Refunds

**Refund Request**:
A Buyer's request to get their money back for a Purchase. It is Requested, Approved or Declined.
_Avoid_: Cancellation, cancel my purchase, reversal, chargeback

**Refund**:
The money returned to a Buyer when a Refund Request is Approved.
_Avoid_: Reversal, chargeback

**Refund Amount**:
The money a Refund Request would return: always the Purchase's Amount Paid, including every Seat of a Team Purchase.
_Avoid_: Refundable amount, cancellation amount

**Refund Window**:
The 14 days after a Purchase during which a Refund Request may be made.
_Avoid_: Cancel window

**Refund Eligibility**:
Whether a Purchase may receive a Refund Request: inside the Refund Window, below the Watch Limit and the Completion Limit, not a Claimed Seat, and with no open Refund Request.

**Watch Limit**:
The amount of video watched in a Course beyond which a Refund Request is no longer allowed.

**Completion Limit**:
The share of a Course's Lessons completed beyond which a Refund Request is no longer allowed.

**Chargeback**:
A payment dispute raised by a Buyer through their card issuer. Not a Refund Request.

## Progress

**Lesson Progress**:
A Student's state on a Lesson: Not Started, In Progress or Completed.

**Course Completion**:
A Student having completed every Lesson in a Course. Once reached it stands, even if Lessons are added later.
_Avoid_: Finished

**Drop-off**:
The point in a Curriculum where Students stop progressing.

## Quizzes

**Quiz**:
A set of Quiz Questions attached to a Lesson.
_Avoid_: Test, exam, assessment

**Quiz Question**:
One question in a Quiz, either multiple choice or true/false.

**Option**:
One selectable choice for a Quiz Question.

**Attempt**:
One sitting of a Quiz by a Student, producing a Score.

**Quiz Answer**:
The Option a Student selected for a Quiz Question in an Attempt.

**Score**:
The fraction of Quiz Questions answered correctly in an Attempt.

**Passing Score**:
The Score a Student must reach to pass a Quiz, set per Quiz.

## Discussion and ratings

**Comment**:
A post on a Lesson's discussion, either top-level or a one-level-deep reply.
_Avoid_: Post

**Unanswered Question**:
A top-level Comment by a Student that has no Staff Reply.

**Staff Reply**:
A reply to a Comment written by Staff.
_Avoid_: Answer

**Rating**:
A Student's 1–5 star score for a Course.
_Avoid_: Review

## Relationships

- A **Purchase** is for one **Course**; a **Team Purchase** yields several **Seats**, each with one **Seat Code**.
- A solo **Purchase** creates an **Enrollment** for its **Buyer**; a **Team Purchase** does not.
- **Claiming** a **Seat Code** creates an **Enrollment** without a **Purchase** of the claimer's own.
- A **Refund Request** belongs to exactly one **Purchase**; a Claimed **Seat** blocks one.
- A **Quiz** has many **Quiz Questions**; an **Attempt** records one **Quiz Answer** per **Quiz Question**.

## Example dialogue

> **Dev:** "The Student wants to cancel — can they?"
> **Domain expert:** "They can raise a **Refund Request** if the **Purchase** passes **Refund Eligibility**. If it came from a Claimed **Seat**, no — that Seat belongs to the **Team**."

## Flagged ambiguities

- "Cancel", "Reversal" and "Chargeback" were all used for a **Refund Request**. Resolved: **Refund Request**; **Chargeback** is reserved for card-issuer disputes.
- "Admin" meant both the platform role and a Team's manager. Resolved: **Admin** and **Team Manager**.
- "Student" meant both the role and anyone enrolled. Resolved: **Student** (enrolled) and **Student role**.
- "Coupon", "code", "invite" and "seat" all named one thing. Resolved: **Seat** and **Seat Code**.
- "Team members" meant people who claimed Seats. Resolved: **Seat Holder**; **Team Member** is formal membership only.
- "Question" and "Answer" meant both quiz items and discussion. Resolved: **Quiz Question**/**Quiz Answer** versus **Unanswered Question**/**Staff Reply**.
- "Completed" for a course had three meanings. Resolved: **Course Completion** is every Lesson completed; the 50% rule is the **Completion Limit**.
- "Review" meant revisit, a wizard step, and (in plans) written reviews. Resolved: **Rating** only; written reviews do not exist.
