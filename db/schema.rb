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

ActiveRecord::Schema.define(version: 20160905105518) do

  create_table "accounts", force: true do |t|
    t.string   "companyname"
    t.string   "firstname"
    t.string   "lastname"
    t.string   "email"
    t.string   "country"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "active_admin_comments", force: true do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "admin_users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree

  create_table "appointments", force: true do |t|
    t.string   "name"
    t.date     "date"
    t.string   "patient_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "dr_comment"
    t.text     "receptionist_comment"
    t.integer  "doctor_id"
    t.integer  "patient_id"
    t.time     "start_time"
    t.time     "end_time"
    t.date     "start_date"
    t.date     "end_date"
    t.string   "doctor_name"
    t.string   "doctor_first"
    t.string   "doctor_last"
    t.boolean  "attended"
    t.boolean  "fail"
  end

  create_table "billable_items", force: true do |t|
    t.string   "name"
    t.string   "type"
    t.decimal  "price",      precision: 10, scale: 0
    t.integer  "tax"
    t.decimal  "total",      precision: 10, scale: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "birds", force: true do |t|
    t.string   "name"
    t.integer  "nest_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "businesses", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.integer  "postcode"
    t.string   "country"
    t.string   "registrationname"
    t.integer  "registrationnumber"
    t.string   "website"
    t.string   "contact"
    t.boolean  "online"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "checkins", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "checkouts", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "concession_types", force: true do |t|
    t.string   "name"
    t.integer  "percentage"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "consult_templates", force: true do |t|
    t.text     "name"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "consultations", force: true do |t|
    t.integer  "patient_id"
    t.integer  "doctor_id"
    t.datetime "time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "consults", force: true do |t|
    t.string   "patient"
    t.string   "doctor"
    t.string   "appointment"
    t.date     "date"
    t.time     "time"
    t.string   "note"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "patient_id"
    t.integer  "doctor_id"
    t.integer  "appointment_id"
  end

  add_index "consults", ["appointment_id"], name: "index_consults_on_appointment_id", using: :btree
  add_index "consults", ["doctor_id"], name: "index_consults_on_doctor_id", using: :btree
  add_index "consults", ["patient_id"], name: "index_consults_on_patient_id", using: :btree

  create_table "contacts", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.integer  "phone"
    t.string   "occupation"
    t.string   "company"
    t.string   "email"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.integer  "postcode"
    t.string   "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "doctors", force: true do |t|
    t.string   "first_name"
    t.string   "position"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "last_name"
    t.string   "name"
  end

  create_table "doctors_patients", force: true do |t|
    t.integer "doctor_id"
    t.integer "patient_id"
  end

  create_table "eggs", force: true do |t|
    t.string   "name"
    t.integer  "nest_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "content"
  end

  create_table "emails", force: true do |t|
    t.string   "subject"
    t.string   "content"
    t.integer  "patient_id"
    t.integer  "doctor_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "emails", ["doctor_id"], name: "index_emails_on_doctor_id", using: :btree
  add_index "emails", ["patient_id"], name: "index_emails_on_patient_id", using: :btree

  create_table "expenses", force: true do |t|
    t.date     "date"
    t.string   "vendor"
    t.string   "category"
    t.decimal  "amount",          precision: 10, scale: 0
    t.decimal  "tax",             precision: 10, scale: 0
    t.decimal  "taxamount",       precision: 10, scale: 0
    t.string   "note"
    t.boolean  "product"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "concession_type"
    t.string   "test"
  end

  create_table "inovices", force: true do |t|
    t.date     "date"
    t.string   "patient"
    t.string   "doctor"
    t.string   "appointment"
    t.string   "item"
    t.decimal  "price",       precision: 10, scale: 0
    t.integer  "quantity"
    t.integer  "tax"
    t.integer  "discount"
    t.decimal  "total",       precision: 10, scale: 0
    t.string   "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "invoices", force: true do |t|
    t.date     "date"
    t.string   "patient"
    t.string   "doctor"
    t.string   "appointment"
    t.string   "item"
    t.decimal  "price",           precision: 10, scale: 0
    t.integer  "quantity"
    t.integer  "tax"
    t.integer  "discount"
    t.decimal  "total",           precision: 10, scale: 0
    t.string   "note"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "item_name"
    t.string   "product"
    t.string   "concession_type"
    t.integer  "patient_id"
    t.string   "lines"
  end

  add_index "invoices", ["patient_id"], name: "index_invoices_on_patient_id", using: :btree

  create_table "letters", force: true do |t|
    t.string   "subject"
    t.string   "content"
    t.integer  "patient_id"
    t.integer  "doctor_id"
    t.integer  "appointment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email"
  end

  add_index "letters", ["appointment_id"], name: "index_letters_on_appointment_id", using: :btree
  add_index "letters", ["doctor_id"], name: "index_letters_on_doctor_id", using: :btree
  add_index "letters", ["patient_id"], name: "index_letters_on_patient_id", using: :btree

  create_table "line_items", force: true do |t|
    t.integer  "appointment_id"
    t.integer  "checkin_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "check_in_time"
    t.datetime "check_out_time"
    t.boolean  "checked_in",     default: true
  end

  create_table "lines", force: true do |t|
    t.integer  "invoice_id"
    t.text     "item"
    t.decimal  "price",      precision: 10, scale: 0
    t.integer  "quantity"
    t.decimal  "tax",        precision: 10, scale: 0
    t.decimal  "discount",   precision: 10, scale: 0
    t.decimal  "total",      precision: 10, scale: 0
    t.text     "product"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "product_id"
  end

  add_index "lines", ["invoice_id"], name: "index_lines_on_invoice_id", using: :btree
  add_index "lines", ["product_id"], name: "index_lines_on_product_id", using: :btree

  create_table "meetings", force: true do |t|
    t.integer  "doctor_id"
    t.integer  "patient_id"
    t.integer  "appointment_id"
    t.text     "content"
    t.date     "date"
    t.time     "time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "meetings", ["appointment_id"], name: "index_meetings_on_appointment_id", using: :btree
  add_index "meetings", ["doctor_id"], name: "index_meetings_on_doctor_id", using: :btree
  add_index "meetings", ["patient_id"], name: "index_meetings_on_patient_id", using: :btree

  create_table "nests", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "patients", force: true do |t|
    t.integer  "UR_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.text     "title"
    t.date     "date_of_birth"
    t.text     "gender"
    t.text     "concession_type"
    t.text     "address"
    t.text     "emergency_contact"
    t.decimal  "medicare_number",   precision: 10, scale: 0
    t.text     "referral_type"
    t.text     "referring_doctor"
    t.integer  "phone_number"
  end

  create_table "payment_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "payments", force: true do |t|
    t.integer  "patient_id"
    t.integer  "doctor_id"
    t.integer  "invoice_id"
    t.integer  "paymentType_id"
    t.integer  "appointment_id"
    t.date     "date"
    t.text     "note"
    t.decimal  "total",          precision: 10, scale: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "payments", ["appointment_id"], name: "index_payments_on_appointment_id", using: :btree
  add_index "payments", ["doctor_id"], name: "index_payments_on_doctor_id", using: :btree
  add_index "payments", ["invoice_id"], name: "index_payments_on_invoice_id", using: :btree
  add_index "payments", ["patient_id"], name: "index_payments_on_patient_id", using: :btree
  add_index "payments", ["paymentType_id"], name: "index_payments_on_paymentType_id", using: :btree

  create_table "procurators", force: true do |t|
    t.text     "name"
    t.integer  "invoice_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "procurators", ["invoice_id"], name: "index_procurators_on_invoice_id", using: :btree

  create_table "products", force: true do |t|
    t.text     "name"
    t.decimal  "price",      precision: 10, scale: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "recipients", force: true do |t|
    t.integer  "letter_id"
    t.text     "email"
    t.text     "name"
    t.text     "first_name"
    t.text     "last_name"
    t.text     "type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "recipients", ["letter_id"], name: "index_recipients_on_letter_id", using: :btree

  create_table "sticks", force: true do |t|
    t.text     "name"
    t.integer  "nest_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sticks", ["nest_id"], name: "index_sticks_on_nest_id", using: :btree

  create_table "taxes", force: true do |t|
    t.text     "name"
    t.integer  "amount"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "templates", force: true do |t|
    t.text     "name"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tests", force: true do |t|
    t.string   "name"
    t.string   "concession_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "twigs", force: true do |t|
    t.text     "name"
    t.integer  "nest_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "twigs", ["nest_id"], name: "index_twigs_on_nest_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "widgets", force: true do |t|
    t.integer  "product_id"
    t.integer  "invoice_id"
    t.string   "item"
    t.decimal  "price",      precision: 10, scale: 0
    t.integer  "quantity"
    t.decimal  "tax",        precision: 10, scale: 0
    t.decimal  "discount",   precision: 10, scale: 0
    t.decimal  "total",      precision: 10, scale: 0
    t.string   "product"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tax_id"
  end

  add_index "widgets", ["invoice_id"], name: "index_widgets_on_invoice_id", using: :btree
  add_index "widgets", ["product_id"], name: "index_widgets_on_product_id", using: :btree
  add_index "widgets", ["tax_id"], name: "index_widgets_on_tax_id", using: :btree

end
