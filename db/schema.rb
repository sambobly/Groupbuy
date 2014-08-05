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

ActiveRecord::Schema.define(version: 20140805100034) do

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
  end

  create_table "checkins", force: true do |t|
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

  create_table "doctors", force: true do |t|
    t.string   "first_name"
    t.string   "position"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "last_name"
  end

  create_table "doctors_patients", force: true do |t|
    t.integer "doctor_id"
    t.integer "patient_id"
  end

  create_table "line_items", force: true do |t|
    t.integer  "appointment_id"
    t.integer  "checkin_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "check_in_time"
    t.datetime "check_out_time"
    t.boolean  "checked_in",     default: true
  end

  create_table "patients", force: true do |t|
    t.integer  "UR_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
  end

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

end
