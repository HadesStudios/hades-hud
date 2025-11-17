local _uircd = {}
local _bugsCD = {}
local Webhook = 'https://discord.com/api/webhooks/1291224953026383883/RxqGIjlKO57KrQEBUyoZ9BHLb6nicYCt8ZhZHaiovab1o-09rt6Y8gbRydHW2xgYP3DL'
local avatar_url = 'https://kappa.lol/Kd6qh'

local function GetLicense(source, license)
    local identifiers = GetPlayerIdentifiers(source)

    for _, id in pairs(identifiers) do
        if id:find(license) then
            return id
        end
    end
    return nil
end

local function SendToDiscord(name, message, color, category)
	local connect = {
		  {
			  ["color"] = color,
			  ["title"] = "**".. name .."**",
			  ["description"] = message,
			  ["footer"] = {
				  ["text"] = category .. ' Report',
			  },
		  }
	  }
	PerformHttpRequest(Webhook, function(err, text, headers) end, 'POST', json.encode({embeds = connect, username = "Bug Catcher", avatar_url = avatar_url}), { ['Content-Type'] = 'application/json' })
end

AddEventHandler("Hud:Shared:DependencyUpdate", RetrieveComponents)
function RetrieveComponents()
	Fetch = exports["hades-base"]:FetchComponent("Fetch")
	Logger = exports["hades-base"]:FetchComponent("Logger")
	Chat = exports["hades-base"]:FetchComponent("Chat")
	Callbacks = exports["hades-base"]:FetchComponent("Callbacks")
	Inventory = exports["hades-base"]:FetchComponent("Inventory")
	Execute = exports["hades-base"]:FetchComponent("Execute")
	Middleware = exports["hades-base"]:FetchComponent("Middleware")
	RegisterChatCommands()
end

AddEventHandler("Core:Shared:Ready", function()
	exports["hades-base"]:RequestDependencies("Hud", {
		"Fetch",
		"Logger",
		"Chat",
		"Callbacks",
		"Inventory",
		"Execute",
		"Middleware",
	}, function(error)
		if #error > 0 then
			return
		end -- Do something to handle if not all dependencies loaded
		RetrieveComponents()

		Middleware:Add("Characters:Creating", function(source, cData)
			return {
				{
					HUDConfig = {
						statusIconToggle = true,
						statusVisible = true,
						speedVisible = true,
						minimapVisible = true,
						locationVisible = true,
						rpmVisible = true,
						fuelVisible = true,
						metricUnits = true,
						positions = {
							horizStatusPos = 50,
							vertStatusPos = 1,
							horizVehiclePos = 50,
							vertVehiclePos = 5,
							horizMinimapPos = 0,
							vertMinimapPos = 0,
							horizLocationPos = 16,
							vertLocationPos = 3,
							statusPos = 'BottomLeft'
						},
					},
				},
			}
		end)

		Middleware:Add("Characters:Spawning", function(source)
			local char = Fetch:Source(source):GetData("Character")
			local config = char:GetData("HUDConfig")
			if not config then
				char:SetData("HUDConfig", {
					statusIconToggle = true,
					statusVisible = true,
					speedVisible = true,
					minimapVisible = true,
					locationVisible = true,
					rpmVisible = true,
					fuelVisible = true,
					metricUnits = true,
					positions = {
						horizStatusPos = 50,
						vertStatusPos = 1,
						horizVehiclePos = 50,
						vertVehiclePos = 5,
						horizMinimapPos = 0,
						vertMinimapPos = 0,
						horizLocationPos = 16,
						vertLocationPos = 3,
						statusPos = 'BottomLeft'
					},
				})
			end
		end, 1)

		Callbacks:RegisterServerCallback("HUD:SaveConfig", function(source, data, cb)
			local char = Fetch:Source(source):GetData("Character")
			if char ~= nil then
				char:SetData("HUDConfig", data)
				cb(true)
			else
				cb(false)
			end
		end)

		Callbacks:RegisterServerCallback("HUD:RemoveBlindfold", function(source, data, cb)
			local plyr = Fetch:Source(source)
			if plyr ~= nil then
				local char = plyr:GetData("Character")
				if char ~= nil then
					local tarState = Player(data).state
					if tarState.isBlindfolded then
						Callbacks:ClientCallback(source, "HUD:PutOnBlindfold", "Removing Blindfold", function(isSuccess)
							if isSuccess then
								if Inventory:AddItem(char:GetData("SID"), "blindfold", 1, {}, 1) then
									tarState.isBlindfolded = false
								else
									Execute:Client(source, "Notification", "Error", "Failed Adding Item")
									cb(false)
								end
							end
						end)
					else
						Execute:Client(source, "Notification", "Error", "Target Not Blindfolded")
						cb(false)
					end
				else
					cb(false)
				end
			else
				cb(false)
			end
		end)

		Inventory.Items:RegisterUse("blindfold", "HUD", function(source, item, itemData)
			Callbacks:ClientCallback(source, "HUD:GetTargetInfront", {}, function(target)
				if target ~= nil then
					local tarState = Player(target).state
					if not tarState.isBlindfolded then
						Callbacks:ClientCallback(
							source,
							"HUD:PutOnBlindfold",
							"Blindfolding",
							function(isSuccess)
								if isSuccess then
									if tarState.isCuffed then
										if
											Inventory.Items:RemoveSlot(item.Owner, item.Name, 1, item.Slot, 1)
										then
											tarState.isBlindfolded = true
										else
											Execute:Client(
												source,
												"Notification",
												"Error",
												"Failed Removing Item"
											)
										end
									else
										Execute:Client(source, "Notification", "Error", "Target Not Cuffed")
									end
								end
							end
						)
					else
						Execute:Client(source, "Notification", "Error", "Target Already Blindfolded")
					end
				else
					Execute:Client(source, "Notification", "Error", "Nobody Near To Blindfold")
				end
			end)
		end)
	end)
end)

function RegisterChatCommands()
	Chat:RegisterCommand("uir", function(source, args, rawCommand)
		if not _uircd[source] or os.time() > _uircd[source] then
			TriggerClientEvent("UI:Client:Reset", source, true)
			_uircd[source] = os.time() + (60 * 2)
		else
			Chat.Send.System:Single(source, "You're Trying To Do This Too Much, Stop.")
		end
	end, {
		help = "Resets UI",
	})
	
	Chat:RegisterCommand("bugs", function(source, args, rawCommand)
		if not _bugsCD[source] or os.time() > _bugsCD[source] then
			TriggerClientEvent("BugReport:Client:CreateReport", source)
		else
			Chat.Send.System:Single(source, "You're Trying To Do This Too Much, Stop.")
		end
	end, {
		help = "Found a bug? Open a report and send it directly to our developers!",
	})

	Chat:RegisterCommand("hud", function(source, args, rawCommand)
		TriggerClientEvent("UI:Client:Configure", source, true)
	end, {
		help = "Open HUD Config Menu",
	})

	Chat:RegisterAdminCommand("testblindfold", function(source, args, rawCommand)
		local plyr = Fetch:Source(source)
		if plyr ~= nil then
			local char = plyr:GetData("Character")
			if char ~= nil then
				Player(source).state.isBlindfolded = not Player(source).state.isBlindfolded
			end
		end
	end, {
		help = "Test Blindfold",
	})

	-- Chat:RegisterAdminCommand("Dialog", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Dialog:Client:Test", source)
	-- end, {
	-- 	help = "Test Dialog",
	-- })

	-- Chat:RegisterAdminCommand("notif", function(source, args, rawCommand)
	-- 	exports["hades-base"]:FetchComponent("Execute"):Client(source, "Notification", "Success", "This is a test, lul")
	-- end, {
	-- 	help = "Test Notification",
	-- })

	-- Chat:RegisterAdminCommand("list", function(source, args, rawCommand)
	-- 	TriggerClientEvent("ListMenu:Client:Test", source)
	-- end, {
	-- 	help = "Test List Menu",
	-- })

	-- Chat:RegisterAdminCommand("input", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Input:Client:Test", source)
	-- end, {
	-- 	help = "Test Input",
	-- })

	-- Chat:RegisterAdminCommand("confirm", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Confirm:Client:Test", source)
	-- end, {
	-- 	help = "Test Confirm Dialog",
	-- })

	-- Chat:RegisterAdminCommand("skill", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Minigame:Client:Skillbar", source)
	-- end, {
	-- 	help = "Test Skill Bar",
	-- })

	-- Chat:RegisterAdminCommand("scan", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Minigame:Client:Scanner", source)
	-- end, {
	-- 	help = "Test Scanner",
	-- })

	-- Chat:RegisterAdminCommand("sequencer", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Minigame:Client:Sequencer", source)
	-- end, {
	-- 	help = "Test Sequencer",
	-- })

	-- Chat:RegisterAdminCommand("keypad", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Minigame:Client:Keypad", source)
	-- end, {
	-- 	help = "Test Keypad",
	-- })

	-- Chat:RegisterAdminCommand("scrambler", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Minigame:Client:Scrambler", source)
	-- end, {
	-- 	help = "Test Scrambler",
	-- })

	-- Chat:RegisterAdminCommand("memory", function(source, args, rawCommand)
	-- 	TriggerClientEvent("Minigame:Client:Memory", source)
	-- end, {
	-- 	help = "Test Memory",
	-- })
end

RegisterServerEvent('BugReport:Server:SendReport', function(data)
	local discord = GetLicense(source, "discord")
	local license = GetLicense(source, "license")

	_bugsCD[source] = os.time() + (60 * 5) -- sets 5 minute cooldown, once the report is placed, to provent spam

	local message = ("Type: `%s`\nDescription: `%s`\nClips: %s\n Discord: <@%s>\nLicense: %s"):format(data.category, data.description, data.clips, discord:gsub("discord:",""), license)

	SendToDiscord(data.title, message, 2123412, data.category)
end)
