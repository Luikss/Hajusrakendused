using Microsoft.AspNetCore.Mvc;
using Rest_Api_Dotnet.Modules;

namespace Rest_Api_Dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GreetingsController : ControllerBase
    {
        private static List<Greeting> _greetings = new List<Greeting>()
        {
            new Greeting() {Id = 1, Recipient = "Jõuluvana", Message = "Hüppa pommi!", Sender = "Juss"},
            new Greeting() {Id = 2, Recipient = "Juss", Message = "Ei hüppa!", Sender = "Jõuluvana"},
            new Greeting() {Id = 3, Recipient = "Päkapikk", Message = "Sellele Jussile küll enam kommi ei vii!", Sender = "Jõuluvana"},
        };

        // GET: api/<GreetingsController>
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_greetings);
        }

        // GET api/<GreetingsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _greetings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Greeting not found" });
            }

            return new JsonResult(result);
        }

        // POST api/<GreetingsController>
        [HttpPost]
        public IActionResult Post([FromBody] Greeting newGreeting)
        {
            if (newGreeting == null)
            {
                return BadRequest();
            }

            var newId = _greetings.Last().Id + 1;
            newGreeting.Id = newId;
            _greetings.Add(newGreeting);

            return CreatedAtAction(nameof(Get), new { id = newId }, newGreeting);
        }

        // PUT api/<GreetingsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Greeting greeting)
        {
            var result = _greetings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Greeting not found" });
            }
            result.Recipient = greeting.Recipient;
            result.Message = greeting.Message;
            result.Sender = greeting.Sender;

            return AcceptedAtAction(nameof(Get), new { id = result.Id }, result);
        }

        // DELETE api/<GreetingsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _greetings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Greeting not found" });
            }
            _greetings.Remove(result);

            return NoContent();
        }
    }
}
