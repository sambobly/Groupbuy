# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170630093825) do

  create_table "accounts", force: :cascade do |t|
    t.string   "companyname", limit: 255
    t.string   "firstname",   limit: 255
    t.string   "lastname",    limit: 255
    t.string   "email",       limit: 255
    t.string   "country",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace",     limit: 255
    t.text     "body",          limit: 65535
    t.string   "resource_id",   limit: 255,   null: false
    t.string   "resource_type", limit: 255,   null: false
    t.integer  "author_id",     limit: 4
    t.string   "author_type",   limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree

  create_table "appointments", force: :cascade do |t|
    t.string   "name",                 limit: 255
    t.date     "date"
    t.string   "patient_name",         limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "dr_comment",           limit: 255
    t.text     "receptionist_comment", limit: 65535
    t.integer  "doctor_id",            limit: 4
    t.integer  "patient_id",           limit: 4
    t.time     "start_time"
    t.time     "end_time"
    t.date     "start_date"
    t.date     "end_date"
    t.string   "doctor_name",          limit: 255
    t.string   "doctor_first",         limit: 255
    t.string   "doctor_last",          limit: 255
    t.boolean  "attended"
    t.boolean  "fail"
  end

  create_table "bids", force: :cascade do |t|
    t.integer  "consumer_id",    limit: 4
    t.decimal  "value",                      precision: 10
    t.string   "comment",        limit: 255
    t.integer  "merchandise_id", limit: 4
    t.boolean  "success"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "complete"
  end

  add_index "bids", ["consumer_id"], name: "index_bids_on_consumer_id", using: :btree
  add_index "bids", ["merchandise_id"], name: "index_bids_on_merchandise_id", using: :btree

  create_table "billable_items", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "type",       limit: 255
    t.decimal  "price",                  precision: 10
    t.integer  "tax",        limit: 4
    t.decimal  "total",                  precision: 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "birds", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "nest_id",    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "businesses", force: :cascade do |t|
    t.string   "name",               limit: 255
    t.string   "address",            limit: 255
    t.string   "city",               limit: 255
    t.string   "state",              limit: 255
    t.integer  "postcode",           limit: 4
    t.string   "country",            limit: 255
    t.string   "registrationname",   limit: 255
    t.integer  "registrationnumber", limit: 4
    t.string   "website",            limit: 255
    t.string   "contact",            limit: 255
    t.boolean  "online"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "checkins", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "checkouts", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "concession_types", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "percentage", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "consult_templates", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.text     "content",    limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "consultations", force: :cascade do |t|
    t.integer  "patient_id", limit: 4
    t.integer  "doctor_id",  limit: 4
    t.datetime "time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "consults", force: :cascade do |t|
    t.string   "patient",        limit: 255
    t.string   "doctor",         limit: 255
    t.string   "appointment",    limit: 255
    t.date     "date"
    t.time     "time"
    t.string   "note",           limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "patient_id",     limit: 4
    t.integer  "doctor_id",      limit: 4
    t.integer  "appointment_id", limit: 4
  end

  add_index "consults", ["appointment_id"], name: "index_consults_on_appointment_id", using: :btree
  add_index "consults", ["doctor_id"], name: "index_consults_on_doctor_id", using: :btree
  add_index "consults", ["patient_id"], name: "index_consults_on_patient_id", using: :btree

  create_table "consumers", force: :cascade do |t|
    t.string   "name",              limit: 255
    t.string   "first_name",        limit: 255
    t.string   "last_name",         limit: 255
    t.string   "date_of_birth",     limit: 255
    t.integer  "payment_method_id", limit: 4
    t.string   "public",            limit: 255
    t.string   "gender",            limit: 255
    t.string   "pronoun",           limit: 255
    t.string   "email",             limit: 255
    t.string   "number",            limit: 255
    t.string   "password",          limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",           limit: 4
    t.string   "avatar",            limit: 255
  end

  add_index "consumers", ["payment_method_id"], name: "index_consumers_on_payment_method_id", using: :btree
  add_index "consumers", ["user_id"], name: "index_consumers_on_user_id", using: :btree

  create_table "contacts", force: :cascade do |t|
    t.string   "firstname",  limit: 255
    t.string   "lastname",   limit: 255
    t.integer  "phone",      limit: 4
    t.string   "occupation", limit: 255
    t.string   "company",    limit: 255
    t.string   "email",      limit: 255
    t.string   "address",    limit: 255
    t.string   "city",       limit: 255
    t.string   "state",      limit: 255
    t.integer  "postcode",   limit: 4
    t.string   "note",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "doctors", force: :cascade do |t|
    t.string   "first_name", limit: 255
    t.string   "position",   limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "last_name",  limit: 255
    t.string   "name",       limit: 255
  end

  create_table "doctors_patients", force: :cascade do |t|
    t.integer "doctor_id",  limit: 4
    t.integer "patient_id", limit: 4
  end

  create_table "eggs", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "nest_id",    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "content",    limit: 65535
  end

  create_table "emails", force: :cascade do |t|
    t.string   "subject",    limit: 255
    t.string   "content",    limit: 255
    t.integer  "patient_id", limit: 4
    t.integer  "doctor_id",  limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "emails", ["doctor_id"], name: "index_emails_on_doctor_id", using: :btree
  add_index "emails", ["patient_id"], name: "index_emails_on_patient_id", using: :btree

  create_table "expenses", force: :cascade do |t|
    t.date     "date"
    t.string   "vendor",          limit: 255
    t.string   "category",        limit: 255
    t.decimal  "amount",                      precision: 10
    t.decimal  "tax",                         precision: 10
    t.decimal  "taxamount",                   precision: 10
    t.string   "note",            limit: 255
    t.boolean  "product"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "concession_type", limit: 255
    t.string   "test",            limit: 255
  end

  create_table "individuals", force: :cascade do |t|
    t.string   "provider",               limit: 255,   default: "email", null: false
    t.string   "uid",                    limit: 255,   default: "",      null: false
    t.string   "encrypted_password",     limit: 255,   default: "",      null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.string   "name",                   limit: 255
    t.string   "nickname",               limit: 255
    t.string   "image",                  limit: 255
    t.string   "email",                  limit: 255
    t.text     "tokens",                 limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "individuals", ["confirmation_token"], name: "index_individuals_on_confirmation_token", unique: true, using: :btree
  add_index "individuals", ["email"], name: "index_individuals_on_email", unique: true, using: :btree
  add_index "individuals", ["reset_password_token"], name: "index_individuals_on_reset_password_token", unique: true, using: :btree
  add_index "individuals", ["uid", "provider"], name: "index_individuals_on_uid_and_provider", unique: true, using: :btree

  create_table "inovices", force: :cascade do |t|
    t.date     "date"
    t.string   "patient",     limit: 255
    t.string   "doctor",      limit: 255
    t.string   "appointment", limit: 255
    t.string   "item",        limit: 255
    t.decimal  "price",                   precision: 10
    t.integer  "quantity",    limit: 4
    t.integer  "tax",         limit: 4
    t.integer  "discount",    limit: 4
    t.decimal  "total",                   precision: 10
    t.string   "note",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "invoices", force: :cascade do |t|
    t.date     "date"
    t.string   "patient",         limit: 255
    t.string   "doctor",          limit: 255
    t.string   "appointment",     limit: 255
    t.string   "item",            limit: 255
    t.decimal  "price",                       precision: 10
    t.integer  "quantity",        limit: 4
    t.integer  "tax",             limit: 4
    t.integer  "discount",        limit: 4
    t.decimal  "total",                       precision: 10
    t.string   "note",            limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",            limit: 255
    t.string   "item_name",       limit: 255
    t.string   "product",         limit: 255
    t.string   "concession_type", limit: 255
    t.integer  "patient_id",      limit: 4
    t.string   "lines",           limit: 255
  end

  add_index "invoices", ["patient_id"], name: "index_invoices_on_patient_id", using: :btree

  create_table "letters", force: :cascade do |t|
    t.string   "subject",        limit: 255
    t.string   "content",        limit: 255
    t.integer  "patient_id",     limit: 4
    t.integer  "doctor_id",      limit: 4
    t.integer  "appointment_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",          limit: 255
  end

  add_index "letters", ["appointment_id"], name: "index_letters_on_appointment_id", using: :btree
  add_index "letters", ["doctor_id"], name: "index_letters_on_doctor_id", using: :btree
  add_index "letters", ["patient_id"], name: "index_letters_on_patient_id", using: :btree

  create_table "line_items", force: :cascade do |t|
    t.integer  "appointment_id", limit: 4
    t.integer  "checkin_id",     limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "check_in_time"
    t.datetime "check_out_time"
    t.boolean  "checked_in",               default: true
  end

  create_table "lines", force: :cascade do |t|
    t.integer  "invoice_id", limit: 4
    t.text     "item",       limit: 65535
    t.decimal  "price",                    precision: 10
    t.integer  "quantity",   limit: 4
    t.decimal  "tax",                      precision: 10
    t.decimal  "discount",                 precision: 10
    t.decimal  "total",                    precision: 10
    t.text     "product",    limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "product_id", limit: 4
  end

  add_index "lines", ["invoice_id"], name: "index_lines_on_invoice_id", using: :btree
  add_index "lines", ["product_id"], name: "index_lines_on_product_id", using: :btree

  create_table "meetings", force: :cascade do |t|
    t.integer  "doctor_id",      limit: 4
    t.integer  "patient_id",     limit: 4
    t.integer  "appointment_id", limit: 4
    t.text     "content",        limit: 65535
    t.date     "date"
    t.time     "time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "meetings", ["appointment_id"], name: "index_meetings_on_appointment_id", using: :btree
  add_index "meetings", ["doctor_id"], name: "index_meetings_on_doctor_id", using: :btree
  add_index "meetings", ["patient_id"], name: "index_meetings_on_patient_id", using: :btree

  create_table "merchandises", force: :cascade do |t|
    t.decimal  "value",                       precision: 10
    t.integer  "category_id",   limit: 4
    t.integer  "consumer_id",   limit: 4
    t.text     "title",         limit: 65535
    t.text     "description",   limit: 65535
    t.datetime "start"
    t.datetime "end"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "category_name", limit: 255
    t.decimal  "bid",                         precision: 10
    t.decimal  "difference",                  precision: 10
    t.string   "consumer_name", limit: 255
    t.boolean  "complete"
    t.boolean  "email"
    t.boolean  "received"
    t.boolean  "paid"
    t.string   "rescue",        limit: 255
  end

  add_index "merchandises", ["category_id"], name: "index_merchandises_on_category_id", using: :btree
  add_index "merchandises", ["consumer_id"], name: "index_merchandises_on_consumer_id", using: :btree

  create_table "nests", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "patients", force: :cascade do |t|
    t.integer  "UR_number",         limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name",        limit: 255
    t.string   "last_name",         limit: 255
    t.string   "email",             limit: 255
    t.text     "title",             limit: 65535
    t.date     "date_of_birth"
    t.text     "gender",            limit: 65535
    t.text     "concession_type",   limit: 65535
    t.text     "address",           limit: 65535
    t.text     "emergency_contact", limit: 65535
    t.decimal  "medicare_number",                 precision: 10
    t.text     "referral_type",     limit: 65535
    t.text     "referring_doctor",  limit: 65535
    t.integer  "phone_number",      limit: 4
  end

  create_table "payment_types", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "payments", force: :cascade do |t|
    t.integer  "patient_id",     limit: 4
    t.integer  "doctor_id",      limit: 4
    t.integer  "invoice_id",     limit: 4
    t.integer  "paymentType_id", limit: 4
    t.integer  "appointment_id", limit: 4
    t.date     "date"
    t.text     "note",           limit: 65535
    t.decimal  "total",                        precision: 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "payments", ["appointment_id"], name: "index_payments_on_appointment_id", using: :btree
  add_index "payments", ["doctor_id"], name: "index_payments_on_doctor_id", using: :btree
  add_index "payments", ["invoice_id"], name: "index_payments_on_invoice_id", using: :btree
  add_index "payments", ["patient_id"], name: "index_payments_on_patient_id", using: :btree
  add_index "payments", ["paymentType_id"], name: "index_payments_on_paymentType_id", using: :btree

  create_table "procurators", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.integer  "invoice_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "procurators", ["invoice_id"], name: "index_procurators_on_invoice_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.decimal  "price",                    precision: 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "recipients", force: :cascade do |t|
    t.integer  "letter_id",  limit: 4
    t.text     "email",      limit: 65535
    t.text     "name",       limit: 65535
    t.text     "first_name", limit: 65535
    t.text     "last_name",  limit: 65535
    t.text     "type",       limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "recipients", ["letter_id"], name: "index_recipients_on_letter_id", using: :btree

  create_table "sticks", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.integer  "nest_id",    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sticks", ["nest_id"], name: "index_sticks_on_nest_id", using: :btree

  create_table "taxes", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.integer  "amount",     limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "templates", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.text     "content",    limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tests", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.string   "concession_type", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tickets", force: :cascade do |t|
    t.integer  "consumer_id",    limit: 4
    t.integer  "bid_id",         limit: 4
    t.integer  "merchandise_id", limit: 4
    t.boolean  "win"
    t.integer  "value",          limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tickets", ["bid_id"], name: "index_tickets_on_bid_id", using: :btree
  add_index "tickets", ["consumer_id"], name: "index_tickets_on_consumer_id", using: :btree
  add_index "tickets", ["merchandise_id"], name: "index_tickets_on_merchandise_id", using: :btree

  create_table "twigs", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.integer  "nest_id",    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "twigs", ["nest_id"], name: "index_twigs_on_nest_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                   limit: 255
    t.string   "password_digest",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "widgets", force: :cascade do |t|
    t.integer  "product_id", limit: 4
    t.integer  "invoice_id", limit: 4
    t.string   "item",       limit: 255
    t.decimal  "price",                  precision: 10
    t.integer  "quantity",   limit: 4
    t.decimal  "tax",                    precision: 10
    t.decimal  "discount",               precision: 10
    t.decimal  "total",                  precision: 10
    t.string   "product",    limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tax_id",     limit: 4
  end

  add_index "widgets", ["invoice_id"], name: "index_widgets_on_invoice_id", using: :btree
  add_index "widgets", ["product_id"], name: "index_widgets_on_product_id", using: :btree
  add_index "widgets", ["tax_id"], name: "index_widgets_on_tax_id", using: :btree

  create_table "wishes", force: :cascade do |t|
    t.integer  "consumer_id",    limit: 4
    t.integer  "merchandise_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "wishes", ["consumer_id"], name: "index_wishes_on_consumer_id", using: :btree
  add_index "wishes", ["merchandise_id"], name: "index_wishes_on_merchandise_id", using: :btree

end
