module EmailsHelper
  def email_image_tag(image, **options)
  attachments.inline[image] = File.read(Rails.root.join("#{image}"))
  image_tag attachments.inline[image].url, **options
  end
end
