import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  date,
  datetime,
  decimal,
  double,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
  year,
} from 'drizzle-orm/mysql-core';
import { customType } from 'drizzle-orm/mysql-core';

const customJson = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return 'json';
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
    fromDriver(value:any){
      return value;
    }
  })(name);
export const AdminLoginTable = mysqlTable('AdminLoginTable', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  status: varchar('status', { length: 50,enum:['offline','online'] }).notNull().default('offline'),
  password: varchar('password', { length: 256 }).notNull(),
}, (AdminLoginTable) => ({
  nameIndex: uniqueIndex('email_idx').on(AdminLoginTable.email),
}))


export const Courses = mysqlTable('Courses', {
  id: int('id').primaryKey().autoincrement(),
  code: text('code').notNull(),
  term: text('term').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('name', { length: 256 }),
  applylink: varchar('name', { length: 256 }),
  startedOn: year('startedYear'),
  eligibility: varchar('eligibility', {
    length: 256, enum: [
      '+2 or Equivalent Course',
      'BSW',
      'BSc Psychology',
      'BSc Maths',
    ]
  }),
  image: varchar('image', { length: 256 }),
  level: varchar('level', { length: 30, enum: ['Under Graduate', 'Post Graduate', 'Diploma', 'Degree'] }),
}, (Courses) => ({
  nameIndex: uniqueIndex('name_idx').on(Courses.name)
}))

export const Events = mysqlTable('Events', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 256 }).notNull(),
  description: varchar('description', { length: 500 }),
  date: date('date'),
  images: varchar('images', { length: 1250 }),
  eventType: mysqlEnum('eventType', [
    'Upcoming Event',
    'Announcement',
    'Events',
    'NSS Event',
  ]),
  link: varchar('link', { length: 256 }),
}, (Events) => ({
  nameIndex: uniqueIndex('name_idx').on(Events.title)
}))

export const AdmissionTable = mysqlTable('admissions', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('student_name', { length: 256 }).notNull(),
  mobile: varchar('mobile', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  address: varchar('address', { length: 3250 }).notNull(),
  appliedCourse: varchar('course', { length: 1250 }).notNull(),
  submittedAt: timestamp('submitted_at').notNull().defaultNow()
}, (AdmissionTable) => ({
  mobileIdx: uniqueIndex('mobile_idx').on(AdmissionTable.mobile),
  emailIdx: uniqueIndex('email_idx').on(AdmissionTable.email),
}))

export const HomeCarousel = mysqlTable('HomeCarousel', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 256 }).notNull(),
  image: varchar('image', { length: 1250 }),
  subtitle: varchar('subtitle', { length: 256 }),
}, (HomeCarousel) => ({
  nameIndex:
    uniqueIndex('title_idx').on(HomeCarousel.title),
}))


export const Centres = mysqlTable('Centres', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 256 }).notNull(),
  image: varchar('image', { length: 1250 }),
  type: varchar('type', { length: 20, enum: ['centre', 'cell', 'activities'] }),
}, (Centres) => ({
  nameIndex: uniqueIndex('title_idx').on(Centres.title),
}))


export const QuestionsDB = mysqlTable('QuestionsDb', {
  id: int('id').primaryKey().autoincrement(),
  question_no: int('question_no').notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  option_len: int('option_len'),
  type: varchar('type', { length: 20, enum: ['null', 'yesno', 'havenot','text','select','int','checkbox'] }),
  options_list: customJson('options_list'),
  required: boolean('required').notNull(),
  added_on : date('date')
}, (QuestionsDB) => ({
  nameIndex: uniqueIndex('title_idx').on(QuestionsDB.title),
  no_index: uniqueIndex('q_noindex').on(QuestionsDB.question_no),
}))

export const ClientResponses = mysqlTable('ClientResponses', {
  id: int('id').primaryKey().autoincrement(),
  gen_id: varchar('generated_id',{length:300}).notNull(),
  author_id: varchar('admin_id',{length:300}).notNull(),
  status: varchar('status', { length: 20, enum: ['started', 'progress', 'completed']}),
  responses: json('responses').notNull(),
  added_on : date('date')
}, (ClientDb) => ({
  genIndex: uniqueIndex('gen_idx').on(ClientDb.gen_id),
}))


// WEBCODECREATORS DATABASES

export const WebcodeFormTable = mysqlTable('webcode_enquiries', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('tname',{length:200}).notNull(),
  phone: varchar('tphone',{length:200}).notNull(),
  email: varchar('tmail',{length:200}).notNull(),
  type: varchar('t_type',{length:300, enum:['Web Designing','Web Development','Web Application','App Development','Poster Designing','Logo Designing']}).notNull(),
  message: varchar('tmessage',{length:5000}).notNull(),
  added_on : timestamp('date').notNull().defaultNow()
});


// MY KUTTANADU APP DATABASES

export const app_top_categories = mysqlTable('app_top_categories',{
  id: int('id').primaryKey().autoincrement(),
  name: varchar('tname',{length:100}),
  image: varchar('timage',{length:600}).notNull(),
  subCategories: json('sub_categories').$type<number[]>().default([]).notNull(),
},(app_top_categories) => ({
  nameIndex: uniqueIndex('name_idx').on(app_top_categories.name),
}))

export const app_categories = mysqlTable('app_categories',{
  id: int('id').primaryKey().autoincrement(),
  type: customJson('type').notNull(),
  name: varchar('name',{length:300}),
  image: varchar('image',{length:600}).notNull(),
  subSuggestions: json('sub_categories').$type<number[]>().default([]).notNull(),
},(app_categories) => ({
  nameIndex: uniqueIndex('name_idx').on(app_categories.name),
}))


export const app_sub_suggesstions = mysqlTable('app_sub_categories',{
  id: int('id').primaryKey().autoincrement(),
  name: varchar('tname',{length:200}),
},(app_sub_suggesstions) => ({
  nameIndex: uniqueIndex('name_idx').on(app_sub_suggesstions.name),
}))

export const app_logintable = mysqlTable('app_logintable', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }),
  mobile: varchar('mobile', { length: 100 }).notNull(),
  device_name: varchar('device_name', { length: 256 }).notNull(),
  categories: json('categories').$type<number[]>().default([]).notNull(),
  login_at: timestamp("login_at").default(sql`CURRENT_TIMESTAMP`),
}, (app_logintable) => ({
  emailIndex: uniqueIndex('email_idx').on(app_logintable.email),
}))

export const AppShareTable = mysqlTable('app_share',{
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id',{length:400}).notNull(),
  pageId: int('page_id').notNull(),
  userName : varchar('share_name',{length: 250}).notNull(),
  updated_at : timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const app_place = mysqlTable('app_place',{
  id: int('id').primaryKey().autoincrement(),
  paid: boolean('paid').notNull().default(false),
  paidPeriod: int('period').notNull().default(0),
  endDate: date('end_date').default(new Date()),
  googleLocation: varchar('google_location',{length:1000}).notNull(),
  app_category_id: int('app_category_id').notNull().references(()=>app_categories.id),
  app_sub_suggestions: json('app_sub_suggestions').notNull().$type<number[]>().default([]),
  name: varchar('name',{length:300}).notNull(),
  place: varchar('place',{length:300}).notNull(),
  sub_place: varchar('sub_place',{length:300}).notNull(),
  panchayatId: int('panchayat_id'),
  wardNo: int('ward_no'),
  rating: decimal('rating',{precision:2,scale:1}).$type<number>().notNull().default(0.0),
  pinCode: int('pincode'),
  address: varchar('address',{length:5000}).notNull(),
  phone: json('phone').$type<string[]>().notNull().default([]),
  email: varchar('email',{length:300}),
  website: varchar('website',{length:100}),
  socialLinks: json('social').$type<{
    type:string,
    link:string,
    text:string
  }[]>().notNull().default([]),
  description: varchar('description',{length:1000}),
  additionalData: varchar('additional_data',{length:1000}),
  images: json('images').$type<string[]>().notNull().default([]),
  videos: json('videos').$type<string[]>().notNull().default([]),
  facilities: json('facilities').$type<string[]>().notNull().default([]),
  activities : json('activities').$type<string[]>().notNull().default([]),
  workingDays: json('working_days').$type<{from:string,to:string} | null>(),
  openingTime: json('opening_time').$type<{from:string,to:string}| null>(),
  nearest_places : json('nearest_places').$type<number[]>().notNull().default([]),
  latitude: varchar('latitude',{length:100}).notNull().default('0.00'),
  longitude: varchar('longitude',{length:100}).notNull().default('0.00'),
  addedAt: timestamp('added_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
},(app_place) => ({
  name: uniqueIndex('name_idx').on(app_place.name),
}))

export const app_activities = mysqlTable('app_activities',{
  id: int('id').primaryKey().autoincrement(),
  user_id: int('user_id').notNull().references(()=>app_logintable.id),
  type: text('activity_type',{enum:["search","page"]}),
  value: varchar('activity_value',{length:500}),
  updated_at : timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const PlaceRelations = relations(app_place, ({ one }) => ({
  app_categories: one(app_categories),
}));

export const ActivityRelations = relations(app_activities, ({ one }) => ({
  app_logintable: one(app_logintable),
}));

export const AppCategoryRelations = relations(app_categories, ({ many }) => ({
  app_place: many(app_place),
}));

export const Review = mysqlTable('app_review_table', {
  id: serial('id').primaryKey(),
  userId: int('user_id').references(() => app_logintable.id),
  placeId: int('place_id').notNull(),
  review: varchar('review',{length:3000}).notNull(),
  rating: decimal('rating',{precision:2,scale:1}).$type<number>().notNull().default(0.0),
  status: text('status',{enum:['added','processing','verified','removed']}),
  addedAt: timestamp('added_at').defaultNow(),
});

export const reviewRelations = relations(Review, ({ one }) => ({
  user: one(app_logintable),
}));