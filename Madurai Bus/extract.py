import re, json, random

path = r"C:\Users\ELCOT\.gemini\antigravity-ide\brain\81bf3a2e-2d08-479c-82a6-95001a783a97\.system_generated\steps\140\content.md"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

route_pattern = re.compile(r'"([0-9A-Za-z]+)"\s*:\s*\{([^{}]+)\}')
matches = route_pattern.finditer(content)

routes_list = []
normalization_log = []

def to_title_case(name):
    # Normalize some common things safely without merging different stops
    name = name.strip()
    # Simple Title Case
    words = name.split(' ')
    return ' '.join(word.capitalize() for word in words)

for m in matches:
    route_num = m.group(1)
    stops_str = m.group(2)
    
    if re.search(r':\d+', stops_str):
        stop_pattern = re.compile(r'([A-Za-z0-9_./-]+|"[^"]+")\s*:\s*\d+')
        stops_raw = stop_pattern.findall(stops_str)
        
        clean_stops = []
        for s in stops_raw:
            raw_name = s.strip('"')
            title_name = to_title_case(raw_name)
            
            # Avoid consecutive duplicates
            if not clean_stops or clean_stops[-1] != title_name:
                clean_stops.append(title_name)
                
            if raw_name != title_name:
                normalization_log.append(f"Normalized: '{raw_name}' -> '{title_name}'")
        
        if len(clean_stops) > 2:
            start = clean_stops[0]
            destination = clean_stops[-1]
            
            routes_list.append({
                "number": route_num,
                "start": start,
                "destination": destination,
                "stops": clean_stops,
                "verified": False,
                "verificationStatus": "pending-review"
            })

print(f"Extracted {len(routes_list)} routes!")

# Write Normalization Log
with open('d:\\Madurai Bus\\normalization_log.txt', 'w', encoding='utf-8') as log_file:
    log_file.write("\n".join(list(set(normalization_log)))) # Unique logs

# Write to JS
with open('d:\\Madurai Bus\\routesData.js', 'w', encoding='utf-8') as out:
    out.write("const allBuses = [\n")
    for r in routes_list:
        hue = random.randint(0, 360)
        color = f"hsl({hue}, 80%, 50%)"
        gradient = f"linear-gradient(135deg, hsl({hue}, 80%, 60%) 0%, hsl({hue}, 90%, 40%) 100%)"
        shadow = f"hsla({hue}, 80%, 50%, 0.4)"
        
        out.write("  {\n")
        out.write(f'    number: "{r["number"]}",\n')
        out.write(f'    start: "{r["start"]}",\n')
        out.write(f'    destination: "{r["destination"]}",\n')
        out.write(f'    color: "{color}",\n')
        out.write(f'    gradient: "{gradient}",\n')
        out.write(f'    shadow: "{shadow}",\n')
        out.write(f'    stops: {json.dumps(r["stops"])},\n')
        out.write('    fare: null,\n')
        out.write('    timings: [],\n')
        out.write('    isFav: false,\n')
        out.write(f'    verified: {str(r["verified"]).lower()},\n')
        out.write(f'    verificationStatus: "{r["verificationStatus"]}"\n')
        out.write("  },\n")
    out.write("];\n")
    out.write("window.allBuses = allBuses;\n")
