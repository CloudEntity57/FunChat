namespace iCloset.Models
{
    public interface IEntity
    {
    }
}namespace iCloset.Models
{
    public interface IEntity<T>
    {
         T ID { get; set; }
    }
}