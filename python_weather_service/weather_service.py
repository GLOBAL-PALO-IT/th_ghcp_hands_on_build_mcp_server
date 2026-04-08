from fastapi import FastAPI, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import random
import json
from typing import Optional

# === FASTAPI APP SETUP ===
app = FastAPI(title="Weather Service", description="MCP Workshop Weather Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === MOCK DATA ===
weather_conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Overcast', 'Drizzle']

city_temperatures = {
    'bangkok': ['30°C', '32°C', '29°C', '33°C', '31°C'],
    'london': ['12°C', '15°C', '8°C', '18°C', '10°C'],
    'new york': ['22°C', '25°C', '18°C', '28°C', '20°C'],
    'tokyo': ['24°C', '26°C', '21°C', '29°C', '23°C'],
    'paris': ['16°C', '19°C', '13°C', '22°C', '14°C'],
    'sydney': ['25°C', '28°C', '22°C', '31°C', '26°C']
}

# === BASIC WEATHER FUNCTIONS ===
def get_mock_weather(city):
    """Get current weather for a city"""
    city_lower = city.lower()
    temperatures = city_temperatures.get(city_lower, ['20°C', '25°C', '18°C', '27°C', '22°C'])
    random_temp = random.choice(temperatures)
    random_condition = random.choice(weather_conditions)
    
    return {
        "city": city_lower,
        "temperature": random_temp,
        "condition": random_condition
    }





# === BASIC REST API ENDPOINTS ===
@app.get("/weather")
async def get_weather(city: Optional[str] = Query("bangkok", description="City name")):
    """Basic REST API - Get mock weather data for the given city"""
    return get_mock_weather(city)

# =============================================================================
# MCP (MODEL CONTEXT PROTOCOL) SECTION
# =============================================================================

# === MCP TOOLS DEFINITION ===
MCP_TOOLS = [
    {
        "name": "weather_get_current",
        "description": "Get current weather information for a specified city",
        "inputSchema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "The name of the city to get weather for (e.g., 'bangkok', 'london', 'tokyo')"
                }
            },
            "required": ["city"]
        }
    },
    {
        "name": "weather_get_forecast",
        "description": "Get 3-day weather forecast for a specified city",
        "inputSchema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "The name of the city to get forecast for"
                },
                "days": {
                    "type": "integer",
                    "description": "Number of forecast days (1-3)",
                    "minimum": 1,
                    "maximum": 3,
                    "default": 3
                }
            },
            "required": ["city"]
        }
    },
    {
        "name": "weather_compare_cities",
        "description": "Compare weather conditions between multiple cities",
        "inputSchema": {
            "type": "object",
            "properties": {
                "cities": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of city names to compare (2-5 cities)",
                    "minItems": 2,
                    "maxItems": 5
                }
            },
            "required": ["cities"]
        }
    }
]

# === MCP ENDPOINTS ===
# This GET /mcp endpoint is for humans and developers who want to inspect and understand the MCP server,
# not for actual MCP protocol communication.
@app.get("/mcp")
async def mcp_info():
    """GET /mcp - Show MCP server information and usage"""
    return {
        "server_info": {
            "name": "weather-service",
            "version": "1.0.0",
            "description": "MCP Weather Service - provides weather data for cities"
        },
        "protocol": "JSON-RPC 2.0 over HTTP",
        "endpoint": "POST /mcp",
        "supported_methods": [
            "initialize",
            "tools/list", 
            "tools/call",
            "shutdown"
        ],
        "available_tools": [tool["name"] for tool in MCP_TOOLS],
        "note": "MCP requires POST requests with JSON-RPC 2.0 format. This GET endpoint is for information only."
    }

# the POST /mcp endpoint is for MCP clients (AI systems, applications) 
# that want to actually use the weather tools through the MCP protocol.
@app.post("/mcp")
async def mcp_protocol_endpoint(request: Request):
    """POST /mcp - MCP Protocol Entry Point (JSON-RPC 2.0)"""
    try:
        body = await request.json()
        method = body.get("method")
        id_ = body.get("id")
        params = body.get("params", {})
        
        # Handle MCP initialize
        if method == "initialize":
            print("🔧 MCP INITIALIZE: Client connecting...")
            
            response = {
                "jsonrpc": "2.0",
                "id": id_,
                "result": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {
                        "tools": {
                            "listChanged": False
                        }
                    },
                    "serverInfo": {
                        "name": "weather-service",
                        "version": "1.0.0"
                    }
                }
            }
            
            print("✅ MCP INITIALIZE: Client connected successfully")
            return response
        
        # Handle notifications/initialized
        elif method == "notifications/initialized":
            print("🔔 Client initialized")
            return  # No response for notifications per MCP spec
        
        # Handle tools/list
        elif method == "tools/list":
            print(f"🔧 MCP TOOLS/LIST: Returning {len(MCP_TOOLS)} tools")
            
            response = {
                "jsonrpc": "2.0",
                "id": id_,
                "result": {
                    "tools": MCP_TOOLS
                }
            }
            
            print(json.dumps(response, indent=2, ensure_ascii=False))
            
            return response
        
        # Handle tools/call
        elif method == "tools/call":
            tool_name = params.get("name", "unknown") if params else "unknown"
            arguments = params.get("arguments", {}) if params else {}
            print(f"🔧 MCP TOOLS/CALL: {tool_name} {arguments}")
            
            if not params:
                print("❌ MCP ERROR: Missing parameters for tools/call")
                return {
                    "jsonrpc": "2.0",
                    "id": id_,
                    "error": {
                        "code": -32603,
                        "message": "Internal error: Missing parameters for tools/call"
                    }
                }
            
            tool_name = params.get("name")
            arguments = params.get("arguments", {})
            
            if tool_name == "weather_get_current":
                city = arguments.get("city", "bangkok")
                
                weather_data = get_mock_weather(city)
                
                response = {
                    "jsonrpc": "2.0",
                    "id": id_,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": f"Current weather in {weather_data['city']}: {weather_data['temperature']}, {weather_data['condition']}"
                            }
                        ],
                        "isError": False
                    }
                }
                
                print(json.dumps(response, indent=2, ensure_ascii=False))

                return response
            
            elif tool_name == "weather_get_forecast":
                city = arguments.get("city", "bangkok")
                days = arguments.get("days", 3)
                # Inline forecast logic
                city_lower = city.lower()
                temperatures = city_temperatures.get(city_lower, ['20°C', '25°C', '18°C', '27°C', '22°C'])
                
                forecast = []
                for i in range(min(days, 3)):
                    forecast.append({
                        "day": f"Day {i+1}",
                        "temperature": random.choice(temperatures),
                        "condition": random.choice(weather_conditions),
                        "humidity": f"{random.randint(40, 80)}%",
                        "wind": f"{random.randint(5, 25)} km/h"
                    })
                
                forecast_data = {
                    "city": city_lower,
                    "forecast_days": len(forecast),
                    "forecast": forecast
                }
                
                forecast_text = f"Weather forecast for {forecast_data['city']} ({forecast_data['forecast_days']} days):\n"
                for day_data in forecast_data['forecast']:
                    forecast_text += f"• {day_data['day']}: {day_data['temperature']}, {day_data['condition']}, Humidity: {day_data['humidity']}, Wind: {day_data['wind']}\n"
                
                response = {
                    "jsonrpc": "2.0",
                    "id": id_,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": forecast_text.strip()
                            }
                        ],
                        "isError": False
                    }
                }
                
                print(f"✅ weather_get_forecast: {city_lower} - {len(forecast)} days")
                return response
            
            elif tool_name == "weather_compare_cities":
                cities = arguments.get("cities", ["bangkok", "london"])
                # Inline comparison logic
                comparison = []
                for city in cities[:5]:  # Limit to 5 cities
                    weather = get_mock_weather(city)
                    comparison.append(weather)
                
                comparison_data = {
                    "comparison_count": len(comparison),
                    "cities_weather": comparison,
                    "summary": f"Weather comparison for {len(comparison)} cities"
                }
                
                comparison_text = f"Weather comparison for {comparison_data['comparison_count']} cities:\n"
                for city_weather in comparison_data['cities_weather']:
                    comparison_text += f"• {city_weather['city'].title()}: {city_weather['temperature']}, {city_weather['condition']}\n"
                
                response = {
                    "jsonrpc": "2.0",
                    "id": id_,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": comparison_text.strip()
                            }
                        ],
                        "isError": False
                    }
                }
                
                print(f"✅ weather_compare_cities: {len(comparison)} cities compared")
                return response
            
            else:
                print(f"❌ Unknown tool: {tool_name}")
                return {
                    "jsonrpc": "2.0",
                    "id": id_,
                    "error": {
                        "code": -32602,
                        "message": f"Unknown tool: {tool_name}"
                    }
                }
        
        # Handle shutdown
        elif method == "shutdown":
            return {
                "jsonrpc": "2.0",
                "id": id_,
                "result": {}
            }
        
        # Unknown method
        else:
            print(f"❌ Unknown method: {method}")
            return {
                "jsonrpc": "2.0",
                "id": id_,
                "error": {
                    "code": -32601,
                    "message": f"Unknown method: {method}"
                }
            }
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return {
            "jsonrpc": "2.0",
            "id": None,
            "error": {
                "code": -32603,
                "message": f"Internal error: {str(e)}"
            }
        }

# === MAIN ENTRY POINT ===
if __name__ == "__main__":
    import uvicorn
    print("🌦️ Weather Service running on http://localhost:3002")
    print("")
    print("📡 REST API Endpoints:")
    print("  GET  http://localhost:3002/weather?city=bangkok")
    print("")
    print("🔧 MCP Protocol Endpoint:")
    print("  GET  http://localhost:3002/mcp (info)")
    print("  POST http://localhost:3002/mcp (protocol)")
    print("")
    print("🛠️ Available MCP Tools:")
    for tool in MCP_TOOLS:
        print(f"  - {tool['name']}: {tool['description']}")
    print("")
    print("📝 Example Usage:")
    print("  Current: {\"name\":\"weather_get_current\",\"arguments\":{\"city\":\"bangkok\"}}")
    print("  Forecast: {\"name\":\"weather_get_forecast\",\"arguments\":{\"city\":\"tokyo\",\"days\":3}}")
    print("  Compare: {\"name\":\"weather_compare_cities\",\"arguments\":{\"cities\":[\"bangkok\",\"london\"]}}")
    print("")
    uvicorn.run(app, host="0.0.0.0", port=3002) 