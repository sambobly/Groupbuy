Dashing.scheduler.every '15s', :first_in => 0 do |job|
  
  Dashing.send_event('waitingroom', { checkins: Checkin.all })

end
